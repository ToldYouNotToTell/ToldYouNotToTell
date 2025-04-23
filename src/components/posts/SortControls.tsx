'use client';

import { usePosts } from '@/hooks/usePosts';
import RewardsPoolButton from '../modules/features/rewards/RewardsPoolButton';
import StakeButton from '../modules/features/staking/StakeButton';

export default function SortControls() {
  const { sortPosts } = usePosts();

  return (
    <div className="sort">
      <RewardsPoolButton />
      <button onClick={() => sortPosts('new')} className="active">
        <i className="fas fa-clock"></i> New
      </button>
      <button onClick={() => sortPosts('top')}>
        <i className="fas fa-star"></i> Top
      </button>
      <button onClick={() => sortPosts('random')}>
        <i className="fas fa-random"></i> Random
      </button>
      <button onClick={() => sortPosts('trending')}>
        <i className="fas fa-fire"></i> Trending
      </button>
      <StakeButton />
    </div>
  );
}