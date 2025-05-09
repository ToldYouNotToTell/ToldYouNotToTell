"use client";

import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

import { useWallet } from "@/hooks/useWallet";
import { db } from "@/lib/firebase";

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
  if (!isModerator || !db) return;
  
  const col = collection(db, "reports");
  const unsub = onSnapshot(col, (snapshot) => {
    const arr = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Report, "id">),
    }));
    setReports(arr);
  });
  
  return () => unsub();
}, [isModerator]);

const dismissReport = async (reportId: string) => {
  if (!db) throw new Error("Database not initialized");
  await deleteDoc(doc(db, "reports", reportId));
};

const deleteReportedPost = async (reportId: string, postId: string) => {
  if (!db) throw new Error("Database not initialized");
  await deleteDoc(doc(db, "posts", postId));
  await deleteDoc(doc(db, "reports", reportId));
};

  return {
    reports,
    dismissReport,
    deleteReportedPost,
    isModerator,
  };
}
