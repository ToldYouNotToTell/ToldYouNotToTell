'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import type { Post } from '@/types/post';

// Если у вас есть сохранённые recovery-коды в локальном хранилище:
const loadRecoveryCodes = (): Record<string, string> =>
  JSON.parse(localStorage.getItem('recoveryCodes') || '{}');

export default function SearchInput() {
  const { posts, setFilteredPosts } = usePosts(); // Предполагается, что хук возвращает весь список и функцию для установки фильтра
  const [query, setQuery] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<Record<string, string>>({});

  useEffect(() => {
    setRecoveryCodes(loadRecoveryCodes());
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase().trim();
    setQuery(e.target.value);

    if (!q) {
      // Пустой запрос — показываем все посты
      setFilteredPosts(posts);
      return;
    }

    // Сначала проверяем на recovery-код
    const recoveryPostId = Object
      .entries(recoveryCodes)
      .find(([, code]) => code.toLowerCase() === q)?.[0];

    if (recoveryPostId) {
      const post = posts.find(p => p.id.toString() === recoveryPostId);
      if (post) {
        setFilteredPosts([post]);
        return;
      }
    }

    // Фильтрация по номеру, заголовку или категории
    const filtered = posts.filter((post: Post) => {
      // номер (orderNumber)
      if (!isNaN(Number(q)) && post.orderNumber === Number(q)) {
        return true;
      }
      // заголовок
      if (post.title.toLowerCase().includes(q)) {
        return true;
      }
      // категория
      if (post.category?.toLowerCase().includes(q)) {
        return true;
      }
      return false;
    });

    setFilteredPosts(filtered);
  };

  return (
    <input
      type="text"
      className="search-box"
      placeholder="Search by number, title or recovery code..."
      value={query}
      onChange={handleChange}
    />
  );
}