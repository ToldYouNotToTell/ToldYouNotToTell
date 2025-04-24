// src/hooks/usePostActions.ts
'use client';

import { useWallet } from '@/hooks/useWallet';
import { useState, useEffect } from 'react';

interface Post {
  authorWallet?: string;
  authorIP?: string;
  date: Date;
}

export const usePostActions = (post: Post) => {
  const { address } = useWallet();
  const [userIP, setUserIP] = useState<string | null>(null);

  // Запрашиваем IP как при монтировании
  useEffect(() => {
    fetch('/api/user-ip')
      .then(res => res.json())
      .then((data: { ip: string }) => setUserIP(data.ip))
      .catch(() => setUserIP(null));
  }, []);

  // Определяем автора: по кошельку или по IP
  const isAuthor = address
    ? post.authorWallet === address
    : post.authorIP === userIP;

  // Сколько осталось до конца окна редактирования (15 минут)
  const timeLeft = (() => {
    const now = Date.now();
    const then = new Date(post.date).getTime();
    const editWindowMs = 15 * 60 * 1000;
    return Math.max(0, editWindowMs - (now - then));
  })();

  return { isAuthor, timeLeft };
};