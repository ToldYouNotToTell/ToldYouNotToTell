import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { EventContext } from 'firebase-functions';

// Инициализируем Firebase Admin SDK
initializeApp();
const db = getFirestore(getApp());

export const verifyCaptcha = onRequest(async (req, res) => {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { token, action = 'submit' } = req.body as {
    token: string;
    action?: string;
  };

  try {
    // Формируем параметры для запроса к reCAPTCHA
    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY || '',
      response: token
    });

    // 1. Проверяем reCAPTCHA у Google
    const googleRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        body: params
      }
    );
    const data = (await googleRes.json()) as {
      success: boolean;
      score: number;
      'error-codes'?: string[];
    };

    // 2. Если неуспешно или score < 0.5 — логируем и возвращаем 400
    if (!data.success || data.score < 0.5) {
      await db.collection('captchaLogs').add({
        status: 'failed',
        score: data.score,
        action,
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        date: new Date().toISOString()
      });

      res.status(400).json({
        verified: false,
        score: data.score,
        reasons: data['error-codes'] || []
      });
      return;
    }

    // 3. Лог успешного прохождения
    await db.collection('captchaLogs').add({
      status: 'success',
      score: data.score,
      action,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      date: new Date().toISOString()
    });

    // 4. Возвращаем результат
    res.status(200).json({
      verified: true,
      score: data.score
    });
  } catch (err) {
    console.error('CAPTCHA verification error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});