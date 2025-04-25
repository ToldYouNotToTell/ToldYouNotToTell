// src/components/posts/SortControls.tsx
'use client';

import { FaClock, FaStar, FaRandom, FaFire, FaLock } from "react-icons/fa";
import { usePosts } from "@/contexts/PostsContext";

export default function SortControls() {
  const { sortType, setSortType } = usePosts();

  return (
    <div className="sort">
      <button
        className="rewards-pool-btn"
        onClick={() => {
          /* show rewards */
        }}
        title="Rewards Pool"
      >
        💎
        <span className="tooltip-text">Loading rewards info...</span>
      </button>
      <button
        onClick={() => setSortType('new')}
        className={sortType === 'new' ? 'active' : ''}
      >
        <FaClock /> New
      </button>
      <button
        onClick={() => setSortType('top')}
        className={sortType === 'top' ? 'active' : ''}
      >
        <FaStar /> Top
      </button>
      <button
        onClick={() => setSortType('random')}
        className={sortType === 'random' ? 'active' : ''}
      >
        <FaRandom /> Random
      </button>
      <button
        onClick={() => setSortType('trending')}
        className={sortType === 'trending' ? 'active' : ''}
      >
        <FaFire /> Trending
      </button>
      <button
        className="stake-btn"
        onClick={() => {
          /* show staking */
        }}
      >
        <FaLock /> Stake TNTT
      </button>
    </div>
  );
}