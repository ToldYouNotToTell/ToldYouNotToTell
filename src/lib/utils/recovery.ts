import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { generateRecoveryCode } from "./crypto";

export const createRecovery = async (userId: string) => {
  const code = generateRecoveryCode();
  await setDoc(doc(db, "recoveryCodes", userId), { code });
  return code;
};

export const verifyRecovery = async (userId: string, code: string) => {
  const docSnap = await getDoc(doc(db, "recoveryCodes", userId));
  return docSnap.exists() && docSnap.data().code === code;
};

export const deleteRecovery = async (userId: string) => {
  await deleteDoc(doc(db, "recoveryCodes", userId));
};