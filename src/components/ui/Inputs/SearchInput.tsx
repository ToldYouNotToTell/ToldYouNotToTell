// src/components/ui/inputs/SearchInput.tsx
"use client";
import React, { ChangeEvent, useState } from "react";

import { usePosts } from "@/contexts/PostsContext";

export default function SearchInput() {
  const { searchPosts } = usePosts();
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    searchPosts(q);
  };

  return (
    <input
      id="main-search-input"
      name="searchQuery"
      type="text"
      className="search-box"
      placeholder="Search by post ID (e.g. A1B2C3), title or category..."
      value={query}
      onChange={handleChange}
      aria-label="Search posts"
    />
  );
}