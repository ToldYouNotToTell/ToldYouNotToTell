import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { adminDb } from '@/lib/firebase-admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, action = 'submit' } = req.body;
  
  try {
    // 1. Verify with Google reCAPTCHA
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    
    // 2. Check if verification succeeded
    if (!response.data.success || response.data.score < 0.5) {
      await adminDb.collection('captchaLogs').add({
        status: 'failed',
        score: response.data.score,
        action,
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        timestamp: new Date()
      });
      
      return res.status(400).json({ 
        verified: false,
        score: response.data.score,
        reasons: response.data['error-codes'] 
      });
    }

    // 3. Log successful verification
    await adminDb.collection('captchaLogs').add({
      status: 'success',
      score: response.data.score,
      action,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      timestamp: new Date()
    });

    res.status(200).json({ 
      verified: true,
      score: response.data.score 
    });
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}