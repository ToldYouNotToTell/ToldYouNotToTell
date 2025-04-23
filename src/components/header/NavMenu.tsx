'use client';

import { usePosts } from '@/hooks/usePosts';

export default function NavMenu() {
  const { showOnlyMyPosts, toggleMyPostsFilter } = usePosts();

  return (
    <div className="nav-menu" id="navMenu">
      <a href="#" onClick={toggleMyPostsFilter}>
        {showOnlyMyPosts ? 'All Posts' : 'My Posts'}
      </a>
      <a href="/promotion">Promotion</a>
      <a href="/rewards">My Rewards</a>
      <a href="/staking">Stake TNTT</a>
      <a href="#" onClick={showFAQ}>
        FAQ
      </a>
    </div>
  );
}

function showFAQ() {
  alert('FAQ: 1. How to recover posts? Use your recovery code in the search box...');
}