"use client";

import React from "react";

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
  onModeratorPanel,
}: NavMenuProps) {
  if (!visible) return null;

  return (
    <div className="nav-menu show" id="navMenu">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onMyPosts();
          onClose();
        }}
        className="nav-menu-item"
      >
        <i className="fas fa-scroll mr-2"></i> My Posts
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onCurrentBoosts();
          onClose();
        }}
        className="nav-menu-item"
      >
        <i className="fas fa-rocket mr-2"></i> Current Boosts
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onMyRewards();
          onClose();
        }}
        className="nav-menu-item"
      >
        <i className="fas fa-coins mr-2"></i> My Rewards
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onPromotion();
          onClose();
        }}
        className="nav-menu-item"
      >
        <i className="fas fa-chart-line mr-2"></i> Promotion
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onFAQ();
          onClose();
        }}
        className="nav-menu-item"
      >
        <i className="fas fa-question-circle mr-2"></i> FAQ
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onModeratorPanel();
          onClose();
        }}
        className="nav-menu-item moderator-link"
      >
        <i className="fas fa-shield-alt mr-2"></i> Moderator Panel
      </a>
    </div>
  );
}
