"use client";

import {
  FaClock,
  FaStar,
  FaRandom,
  FaFire,
  FaLock,
} from "react-icons/fa";

import { usePosts } from "@/contexts/PostsContext";

export default function SortControls() {
  const { sortType, sortPosts } = usePosts();

  const openRewardsModal = () => {
  };

  const openStakingModal = () => {
  };

  return (
    <div className="sort-controls">
      {/* Кнопка Rewards Pool с отдельным классом */}
      <button
        data-tooltip="Coming soon"
        className="icon-only-btn"
        onClick={openRewardsModal}
        title="Rewards Pool"
      >
        💎
      </button>

      <button
        onClick={() => sortPosts("new")}
        className={sortType === "new" ? "active" : ""}
      >
        <FaClock /> New
      </button>

      <button
        onClick={() => sortPosts("top")}
        className={sortType === "top" ? "active" : ""}
      >
        <FaStar /> Top
      </button>

      <button
        onClick={() => sortPosts("random")}
        className={sortType === "random" ? "active" : ""}
      >
        <FaRandom /> Random
      </button>

      <button
        onClick={() => sortPosts("trending")}
        className={sortType === "trending" ? "active" : ""}
      >
        <FaFire /> Trending
      </button>

      {/* Кнопка Stake (TYNT) */}
      <button
        data-tooltip="Coming soon"
        className="tnt-btn"
        onClick={openStakingModal}
      >
        <FaLock /> TYNT
      </button>
    </div>
  );
}
