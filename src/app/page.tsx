// src/app/page.tsx
"use client";

import React from "react";
import { usePosts } from "@/contexts/PostsContext";
import RewardsInfo from "@/components/modules/features/rewards/RewardsInfo";
import SortControls from "@/components/posts/SortControls";
import PostList from "@/components/posts/PostList";
import BackToTopButton from "@/components/ui/buttons/BackToTopButton";

export default function HomePage() {
  const { loading } = usePosts();

  // Рассчитываем текущий пул и время следующего распределения
  const totalPool = 1000; // сюда подставь своё реальное значение
  const now = new Date();
  const nextDistribution = new Date(now);
  nextDistribution.setDate(now.getDate() + 1);
  nextDistribution.setHours(0, 0, 0, 0);

  return (
    <main className="my-6 px-4">
      {/* Информация о пуле наград */}
      <RewardsInfo
        totalPool={totalPool}
        nextDistribution={nextDistribution}
      />

      {/* Контролы сортировки (без пропсов!) */}
      <SortControls />

      {/* Список постов или индикатор загрузки */}
      {loading ? (
        <div>Loading posts…</div>
      ) : (
        <PostList />
      )}

      {/* Кнопка "Наверх" */}
      <BackToTopButton />
    </main>
  );
}