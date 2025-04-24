"use client";

import { usePosts } from "@/hooks/usePosts";

export default function SearchBar() {
  const { searchPosts } = usePosts();

  return (
    <input
      type="text"
      className="search-box"
      placeholder="Search by number, title or recovery code..."
      onChange={(e) => searchPosts(e.target.value)}
    />
  );
}