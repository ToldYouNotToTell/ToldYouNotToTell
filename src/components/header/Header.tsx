"use client";
import React, { useState } from "react";

import AddPostButton from "@/components/ui/buttons/AddPostButton";
import PhantomButton from "@/components/ui/buttons/PhantomButton";
import PresaleButton from "@/components/ui/buttons/PresaleButton";
import ThemeToggleButton from "@/components/ui/buttons/ThemeToggleButton";
import { usePosts } from "@/contexts/PostsContext";

import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { searchPosts } = usePosts();

  const toggleNav = () => setNavOpen((o) => !o);
  const handleSearch = (query: string) => searchPosts(query);

  return (
    <header className="header-bar">
      <div className="header-container">
        <div className="logo">ToldYouNotToTell</div>

        <div className="header-main-controls">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="header-secondary-controls">
          <AddPostButton />
          <PresaleButton />
          <PhantomButton />
          <button
            className="nav-toggle"
            onClick={toggleNav}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          <NavMenu
            visible={navOpen}
            onClose={toggleNav}
            onMyPosts={() => {}}
            onCurrentBoosts={() => {}}
            onMyRewards={() => {}}
            onPromotion={() => {}}
            onFAQ={() => {}}
            onModeratorPanel={() => {}}
          />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
