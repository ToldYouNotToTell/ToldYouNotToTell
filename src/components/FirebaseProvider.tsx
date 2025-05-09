"use client";
import { useEffect } from "react";

import { auth } from "@/lib/firebase";
import { migrateLocalToFirebase } from "@/lib/migrateToFirebase";

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (!auth) {
      console.warn("Firebase Auth not initialized");
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await migrateLocalToFirebase();
        } catch (e) {
          console.error("Migration failed:", e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};