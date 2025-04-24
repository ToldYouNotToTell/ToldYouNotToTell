'use client';

import React from 'react';
import { usePosts } from '@/hooks/usePosts';

// Обновлённые пути:
import RewardsPoolButton from '@/components/ui/buttons/RewardsPoolButton';
import StakeButton from '@/components/ui/buttons/StakeButton';

export default function SortControls() {
  const { sortType, setSortType } = usePosts();

  return (
    <div className="sort">
      <RewardsPoolButton />

      <button
        className={sortType === 'new' ? 'active' : ''}
        onClick={() => setSortType('new')}
      >
        <i className="fas fa-clock"></i> New
      </button>

      <button
        className={sortType === 'top' ? 'active' : ''}
        onClick={() => setSortType('top')}
      >
        <i className="fas fa-star"></i> Top
      </button>

      <button
        className={sortType === 'random' ? 'active' : ''}
        onClick={() => setSortType('random')}
      >
        <i className="fas fa-random"></i> Random
      </button>

      <button
        className={sortType === 'trending' ? 'active' : ''}
        onClick={() => setSortType('trending')}
      >
        <i className="fas fa-fire"></i> Trending
      </button>

      <StakeButton />
    </div>
  );
}