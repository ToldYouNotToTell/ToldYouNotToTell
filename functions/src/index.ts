import { onSchedule } from 'firebase-functions/v2/pubsub'
import { initializeApp, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import type { EventContext } from 'firebase-functions'

// Инициализируем Admin SDK
initializeApp()
const db = getFirestore(getApp())

/**
 * Ежедневный розыгрыш наград:
 * - Собирает топ-10 постов за последние 24 часа (по полю 'stars')
 * - Берёт пул наград из документа settings/rewardPool.amount
 * - Равномерно распределяет 50% пула между этими постами
 * - Записывает результаты в коллекцию dailyRewards
 */
export const dailyRewardDraw = onSchedule(
  {
    schedule: '0 0 * * *',      // каждый день в 00:00 по cron
    timeZone: 'Asia/Dubai',     // локальное время Дубая
    region: 'asia-south1'       // регион для выполнения
  },
  async (context: EventContext) => {
    // 1) Определяем временную границу — 24 часа назад
    const since = Date.now() - 24 * 60 * 60 * 1000
    const topSnap = await db
      .collection('posts')
      .where('timestamp', '>=', since)
      .orderBy('stars', 'desc')
      .limit(10)
      .get()

    // 2) Загружаем текущий пул наград
    const poolDoc = await db.collection('settings').doc('rewardPool').get()
    const pool = poolDoc.exists ? poolDoc.data()!.amount : 0

    // 3) Вычисляем долю для каждого из топ-10 (50% пула)
    const count = topSnap.docs.length
    const share = count > 0 ? (pool * 0.5) / count : 0

    // 4) Подготавливаем batch-операцию для записи результатов
    const batch = db.batch()
    for (const doc of topSnap.docs) {
      const rewardEntry = {
        postId: doc.id,
        amount: share,
        drawnAt: Date.now()
      }
      const ref = db.collection('dailyRewards').doc()
      batch.set(ref, rewardEntry)
    }

    // 5) Коммитим все записи
    await batch.commit()
    console.log(`Daily draw completed: distributed to ${count} posts`)
  }
)