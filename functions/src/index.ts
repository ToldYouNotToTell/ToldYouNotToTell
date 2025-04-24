import { onSchedule } from 'firebase-functions/v2/pubsub';
import { initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { EventContext } from 'firebase-functions';

// Инициализация Admin SDK
initializeApp();
const db = getFirestore(getApp());

/**
 * Ежедневный розыгрыш наград:
 * - Собирает топ-10 постов за последние 24 часа
 * - Вычисляет доли наград по вашей логике (см. TYNTT_Reward_System_EN.docx)
 * - Записывает результаты в коллекцию "dailyRewards"
 */
export const dailyRewardDraw = onSchedule(
  {
    schedule: '0 0 * * *',      // каждый день в 00:00 по расписанию cron
    timeZone: 'Asia/Dubai',     // локальное время для Дубая
    region: 'asia-south1'       // регион ближе к пользователям Ближнего Востока
  },
  async (context: EventContext) => {
    // 1) Считаем начало периода — 24 часа назад
    const since = Date.now() - 24 * 60 * 60 * 1000;
    const topSnap = await db
      .collection('posts')
      .where('timestamp', '>=', since)
      .orderBy('stars', 'desc')
      .limit(10)
      .get();

    // 2) Готовим пул наград (из вашего документа)
    const rewardPoolDoc = await db.collection('settings').doc('rewardPool').get();
    const pool = rewardPoolDoc.exists ? rewardPoolDoc.data()!.amount : 0;

    // 3) Распределяем награды (пример: 50% — на топ-10 равными долями)
    const topCount = topSnap.docs.length;
    const share = (pool * 0.5) / topCount;

    const batch = db.batch();
    topSnap.docs.forEach(doc => {
      const rewardData = {
        postId: doc.id,
        amount: share,
        drawnAt: Date.now(),
      };
      const ref = db.collection('dailyRewards').doc();
      batch.set(ref, rewardData);
    });

    await batch.commit();

    console.log(`Daily draw completed: distributed to ${topCount} posts`);
  }
);