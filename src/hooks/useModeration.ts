'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useWallet } from '@/hooks/useWallet';

export interface Report {
  id: string;
  postId: string;
  reason: string;
  reporter: string;
  createdAt: string; // ISO или timestamp
}

export function useModeration() {
  const { address } = useWallet();
  // TODO: заменить на реальную проверку модератора, например сравнение address
  const isModerator = Boolean(address);

  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (!isModerator) return;
    const col = collection(db, 'reports');
    const unsub = onSnapshot(col, snapshot => {
      const arr = snapshot.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<Report, 'id'>),
      }));
      setReports(arr);
    });
    return () => unsub();
  }, [isModerator]);

  /** Удалить только жалобу */
  const dismissReport = async (reportId: string) => {
    await deleteDoc(doc(db, 'reports', reportId));
  };

  /** Удалить отмеченный пост и связанную с ним жалобу */
  const deleteReportedPost = async (
    reportId: string,
    postId: string
  ) => {
    await deleteDoc(doc(db, 'posts', postId));
    await deleteDoc(doc(db, 'reports', reportId));
  };

  return {
    reports,
    dismissReport,
    deleteReportedPost,
    isModerator,
  };
}