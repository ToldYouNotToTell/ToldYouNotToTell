import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db, auth } from "@/lib/firebase";

export const useUniversalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (newValue: T) => Promise<void>] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localData = window.localStorage.getItem(key);
      return localData ? JSON.parse(localData) : initialValue;
    }
    return initialValue;
  });

  // 🔽 Загрузка из Firestore
  useEffect(() => {
    if (typeof window === "undefined" || !auth || !db) return;

    const user = auth.currentUser;
    if (!user) return;

    const syncWithFirebase = async () => {
      try {
        const docRef = doc(db!, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data()[key] !== undefined) {
          const firebaseValue = docSnap.data()[key] as T;
          setValue(firebaseValue);
        }
      } catch (error) {
        console.error("Error syncing with Firebase:", error);
      }
    };

    syncWithFirebase();
  }, [key]);

  // 🔽 Сохранение в Firestore
  const setAndSync = async (newValue: T) => {
    setValue(newValue);

    if (typeof window === "undefined" || !auth || !db) return;

    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { [key]: newValue }, { merge: true });
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }

    // Также обновим localStorage
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setAndSync];
};
