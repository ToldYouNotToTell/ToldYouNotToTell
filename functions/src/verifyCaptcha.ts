import { initializeApp } from "firebase-admin/app";
import { getAppCheck } from "firebase-admin/app-check";
import { getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

initializeApp();
const db = getFirestore();

export const verifyCaptcha = onRequest(
  { 
    secrets: ["RECAPTCHA_SECRET_KEY"],
    cors: true,
    enforceAppCheck: false
  },
  async (req, res) => {
    const appCheckToken = req.header('X-Firebase-AppCheck');
    
    if (!appCheckToken) {
      res.status(401).json({ error: "App Check token required" });
      return;
    }

    try {
      await getAppCheck().verifyToken(appCheckToken);
      
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }

      const { token } = req.body;
      if (!token) {
        res.status(400).json({ error: "CAPTCHA token required" });
        return;
      }

      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
      
      const response = await fetch(verificationUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const data = await response.json();

      if (!data.success || data.score < 0.5) {
        res.status(400).json({ verified: false, score: data.score });
        return;
      }

      res.status(200).json({ verified: true, score: data.score });
    } catch (error) {
      logger.error("Verification failed", { error });
      res.status(500).json({ error: "Internal server error" });
    }
  }
);