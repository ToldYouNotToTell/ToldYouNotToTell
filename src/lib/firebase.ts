// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Добавляем проверку для Vercel
function assertFirebaseConfig() {
  if (typeof window === 'undefined') {
    // Серверный режим (SSR)
    if (!firebaseConfig.apiKey) {
      throw new Error(`
        Missing Firebase config! Check:
        1. Vercel ENV variables
        2. next.config.js env export
        Current config: ${JSON.stringify(firebaseConfig, null, 2)}
      `);
    }
  } else {
    // Клиентский режим
    if (!firebaseConfig.apiKey) {
      console.error('Firebase config missing!', firebaseConfig);
    }
  }
}

assertFirebaseConfig();

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);