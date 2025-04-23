'use client';
import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { migrateLocalToFirebase } from '@/lib/migrateToFirebase';

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        migrateLocalToFirebase();
      }
    });
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};