"use client";
import { Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";

import { useWallet } from "@/hooks/useWallet";
import type { Post } from "@/types/post";

export const usePostActions = (post: Post) => {
  const { publicKey } = useWallet();
  const [userIP, setUserIP] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error('IP fetch failed');
        const data = await response.json();
        setUserIP(data.ip || null);
      } catch (error) {
        console.error("Failed to fetch IP:", error);
        setUserIP(null);
        setError("Could not determine your IP address");
      }
    };

    fetchIP();
  }, []);

  const isAuthor = Boolean(
    (publicKey && post.authorWallet === publicKey.toString()) ||
    (userIP && post.authorIp === userIP)
  );

  const timeLeft = (() => {
    try {
      const now = Date.now();
      const getDateValue = (date: Post["date"]) => {
        if (typeof date === "string") return new Date(date).getTime();
        if (date instanceof Date) return date.getTime();
        if (date instanceof Timestamp) return date.toDate().getTime();
        throw new Error("Invalid date format");
      };
      const then = getDateValue(post.date);
      const editWindowMs = 3 * 60 * 60 * 1000;
      return Math.max(0, editWindowMs - (now - then));
    } catch (err) {
      console.error("Error calculating time left:", err);
      return 0;
    }
  })();

  const canEdit = isAuthor && timeLeft > 0;

  // Функция для безопасного удаления поста
  const deletePost = async (onDelete: () => Promise<void>) => {
    try {
      if (!isAuthor) {
        throw new Error("You are not the author of this post");
      }

      if (timeLeft <= 0) {
        throw new Error("Editing window has expired (3 hours limit)");
      }

      await onDelete();
    } catch (error) {
      console.error("Delete post error:", error);
      setError(error instanceof Error ? error.message : "Failed to delete post");
      throw error;
    }
  };

  return { isAuthor, timeLeft, canEdit, deletePost, error };
};