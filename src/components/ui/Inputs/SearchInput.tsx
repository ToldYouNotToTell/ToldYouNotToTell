// src/components/ui/inputs/SearchInput.tsx
'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import { usePosts } from '@/contexts/PostsContext';

export default function SearchInput() {
  const { posts, searchPosts } = usePosts(); // Используем только нужные методы
  const [query, setQuery] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<Record<number, string>>({});

  useEffect(() => {
    // Выносим функцию за пределы компонента
    const loadCodes = () => {
      try {
        return JSON.parse(localStorage.getItem('recoveryCodes') || '{}');
      } catch {
        return {};
      }
    };
    setRecoveryCodes(loadCodes());
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    searchPosts(q); // Используем метод из контекста
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