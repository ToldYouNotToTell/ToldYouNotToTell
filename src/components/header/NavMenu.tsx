// src/components/header/NavMenu.tsx
'use client';

import React from 'react';

export interface NavMenuProps {
  visible: boolean;
  onClose: () => void;
  onMyPosts: () => void;
  onCurrentBoosts: () => void;
  onMyRewards: () => void;
  onPromotion: () => void;
  onFAQ: () => void;
  onModeratorPanel: () => void;
}

export default function NavMenu({
  visible,
  onClose,
  onMyPosts,
  onCurrentBoosts,
  onMyRewards,
  onPromotion,
  onFAQ,
  onModeratorPanel
}: NavMenuProps) {
  return (
    <div className={`nav-menu${visible ? ' show' : ''}`} id="navMenu">
      <a href="#" onClick={(e) => { e.preventDefault(); onMyPosts(); onClose(); }} id="navMenuMyPosts">
        My Posts
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); onCurrentBoosts(); onClose(); }}>
        Current Boosts
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); onMyRewards(); onClose(); }}>
        My Rewards
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); onPromotion(); onClose(); }}>
        Promotion
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); onFAQ(); onClose(); }}>
        FAQ
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onModeratorPanel(); onClose(); }}
        id="moderatorLink"
        className="moderator-link"
      >
        Moderator Panel
      </a>
    </div>
  );
}