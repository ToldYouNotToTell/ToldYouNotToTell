"use client";
import { doc, setDoc } from "firebase/firestore";

import { db, auth } from "@/lib/firebase";

export const migrateLocalToFirebase = async () => {
  if (!auth || !db) {
    throw new Error("Firebase services not initialized");
  }

  const user = auth.currentUser;
  if (!user) return;

  const keysToMigrate = [
    "posts",
    "userVotes",
    "commentAuthors",
    "reports",
  ];

  const migrations = keysToMigrate.map(async (key) => {
    const data = localStorage.getItem(key);
    if (data && db) { // Добавлена проверка db
      await setDoc(
        doc(db, "users", user.uid), // Теперь db точно не null
        { [key]: JSON.parse(data) },
        { merge: true }
      );
    }
  });

  await Promise.all(migrations);
};