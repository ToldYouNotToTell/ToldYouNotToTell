// src/lib/utils/recovery.ts
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, deleteDoc as firebaseDeleteDoc } from "firebase/firestore";

/**
 * Генерирует случайный код восстановления
 * @returns 8-символьный код из букв и цифр
 */
export const generateRecoveryCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Создать и сохранить код восстановления
 */
export const createRecovery = async (userId: string): Promise<string> => {
  const code = generateRecoveryCode();
  await setDoc(doc(db, "recoveryCodes", userId), {
    code,
    createdAt: new Date().toISOString(),
  });
  return code;
};

/**
 * Проверить валидность кода восстановления
 */
export const verifyRecovery = async (userId: string, code: string): Promise<boolean> => {
  const snap = await getDoc(doc(db, "recoveryCodes", userId));
  return snap.exists() && snap.data()?.code === code;
};

/**
 * Удалить код восстановления
 */
export const deleteRecovery = async (userId: string): Promise<void> => {
  await firebaseDeleteDoc(doc(db, "recoveryCodes", userId));
};