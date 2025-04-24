import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export const useUniversalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    // Инициализация из localStorage
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : initialValue;
  });

  useEffect(() => {
    const user = auth.currentUser;

    const syncWithFirebase = async () => {
      if (!user) return;

      try {
        // 1. Загружаем из Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data()[key] !== undefined) {
          const firebaseValue = docSnap.data()[key];
          setValue(firebaseValue);
          localStorage.setItem(key, JSON.stringify(firebaseValue));
        } else {
          // 2. Если в Firestore нет - сохраняем текущее значение
          await setDoc(docRef, { [key]: value }, { merge: true });
        }
      } catch (error) {
        console.error("Firebase sync error:", error);
      }
    };

    syncWithFirebase();
  }, [key]);

  const setValueUniversal = async (newValue: T) => {
    // 1. Обновляем локальное состояние
    setValue(newValue);
    // 2. Сохраняем в localStorage
    localStorage.setItem(key, JSON.stringify(newValue));

    // 3. Синхронизируем с Firebase (если пользователь авторизован)
    if (auth.currentUser) {
      try {
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          { [key]: newValue },
          { merge: true }
        );
      } catch (error) {
        console.error("Firebase save error:", error);
      }
    }
  };

  return [value, setValueUniversal] as const;
};
