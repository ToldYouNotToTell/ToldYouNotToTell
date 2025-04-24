import { onSchedule } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions';
import { initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore(getApp());

/**
 * Ежедневная лотерея по рейтингу (звёздам) топ-10 постов.
 * Запускается раз в 24 ч, по времени Asia/Dubai, но в регионе us-central1.
 */
export const dailyLottery = onSchedule(
  {
    schedule: 'every 24 hours',
    timeZone: 'UTC',
    region: 'us-central1'
  },
  async (event) => {
    logger.log('⏰ Запуск ежедневной лотереи', event);

    // Берём топ-10 по полю `rating`
    const topSnap = await db
      .collection('posts')
      .orderBy('rating', 'desc')
      .limit(10)
      .get();

    const winners = topSnap.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      rating: doc.data().rating
    }));

    // Сохраняем результат под сегодняшнюю дату
    const today = new Date().toISOString().split('T')[0];
    await db.collection('lotteryResults').doc(today).set({
      winners,
      createdAt: new Date()
    });

    logger.log('✅ Лотерея проведена, победители:', winners);
  }
);