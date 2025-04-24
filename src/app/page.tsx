// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header/Header';
import RewardsInfo from '@/components/modules/features/rewards/RewardsInfo';
import SortControls from '@/components/SortControls';
import PostList from '@/components/posts/PostList';
import BackToTopButton from '@/components/ui/buttons/BackToTopButton';
import { usePosts } from '@/contexts/PostsContext';

export default function HomePage() {
  const { posts, loading, searchPosts } = usePosts();
  const [totalPool, setTotalPool] = useState<number>(0);
  const [nextDistribution, setNextDistribution] = useState<string>('');

  // Рассчитываем время до следующего распределения и примерный пул
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diffMs = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setNextDistribution(`${hours}h ${minutes}m`);
    setTotalPool(1000); // <- здесь можно заменить на реальное значение из контекста или API
  }, []);

  const handleSort = (type: 'new' | 'top' | 'random' | 'trending') => {
    // TODO: вызвать сортировку из контекста, например sortPosts(type)
    console.log('Sort by', type);
  };

  const handleAddPost = () => {
    // TODO: показать форму добавления поста
    console.log('Open add-post form');
  };
  const handleToggleNav = () => {
    // TODO: открыть/закрыть навигацию
    console.log('Toggle nav menu');
  };
  const handleToggleTheme = () => {
    // TODO: переключить тему
    console.log('Toggle theme');
  };

  return (
    <main className="post-container">
      {/* Хедер */}
      <Header
        onSearch={searchPosts}
        onAddPost={handleAddPost}
        onToggleNav={handleToggleNav}
        onToggleTheme={handleToggleTheme}
      />

      {/* Инфо о пуле наград */}
      <RewardsInfo
        totalPool={totalPool}
        nextDistribution={nextDistribution}
      />

      {/* Контролы сортировки */}
      <SortControls onSort={handleSort} />

      {/* Список постов или индикатор загрузки */}
      {loading ? (
        <div>Loading posts…</div>
      ) : (
        <PostList posts={posts} onSearch={searchPosts} />
      )}

      {/* Кнопка “Наверх” */}
      <BackToTopButton />
    </main>
  );
}