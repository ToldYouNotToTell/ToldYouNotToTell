// src/lib/utils/recovery.ts
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, deleteDoc as firebaseDeleteDoc } from "firebase/firestore";
import { generateRecoveryCode } from "@/lib/utils/crypto";

/**
 * Сгенерировать и сохранить код восстановления для пользователя.
 * @param userId — идентификатор пользователя
 * @returns сгенерированный код
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
 * Проверить валидность кода восстановления.
 * @param userId — идентификатор пользователя
 * @param code — код для проверки
 * @returns true, если код совпадает и не истёк
 */
export const verifyRecovery = async (userId: string, code: string): Promise<boolean> => {
  const snap = await getDoc(doc(db, "recoveryCodes", userId));
  return snap.exists() && snap.data().code === code;
};

/**
 * Удалить код восстановления (после успешного восстановления или по таймауту).
 * @param userId — идентификатор пользователя
 */
export const deleteRecovery = async (userId: string): Promise<void> => {
  await firebaseDeleteDoc(doc(db, "recoveryCodes", userId));
};