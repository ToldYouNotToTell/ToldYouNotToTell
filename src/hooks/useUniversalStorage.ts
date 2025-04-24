// src/hooks/useUniversalStorage.ts
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export const useUniversalStorage = <T>(key: string, initialValue: T) => {
  // 1) Инициализация состояния — только в браузере читаем localStorage
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localData = window.localStorage.getItem(key);
      return localData ? JSON.parse(localData) : initialValue;
    }
    return initialValue;
  });

  // 2) Синхронизация с Firestore, когда ключ или value изменятся
  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = auth.currentUser;
    if (!user) return;

    const syncWithFirebase = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data()[key] !== undefined) {
          const firebaseValue = docSnap.data()[key] as T;
          setValue(firebaseValue);
          window.localStorage.setItem(key, JSON.stringify(firebaseValue));
        } else {
          await setDoc(docRef, { [key]: value }, { merge: true });
        }
      } catch (error) {
        console.error("Firebase sync error:", error);
      }
    };

    syncWithFirebase();
  }, [key, value]);

  // 3) Обновление и в localStorage, и в Firestore
  const setValueUniversal = async (newValue: T) => {
    setValue(newValue);
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        { [key]: newValue },
        { merge: true }
      );
    } catch (error) {
      console.error("Firebase save error:", error);
    }
  };

  return [value, setValueUniversal] as const;
};