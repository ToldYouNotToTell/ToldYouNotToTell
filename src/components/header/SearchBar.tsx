"use client";

import React, { ChangeEvent, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string, isRecoveryCode?: boolean, isModeratorSearch?: boolean) => void;
  isModerator?: boolean;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  isModerator = false,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    
    if (isModerator && query.startsWith("/mod ")) {
      onSearch(query.substring(5), false, true);
    } else {
      onSearch(query);
    }
  };

  return (
    <input
      id={isModerator ? "moderator-search-input" : "regular-search-input"} // Добавлено
      name="searchQuery"          // Добавлено
      type="text"
      className={`search-box ${isModerator ? 'moderator-search' : ''}`}
      placeholder={isModerator ? "Search or /mod [query]..." : placeholder}
      value={value}
      onChange={handleChange}
      aria-label={isModerator ? "Moderator search" : "Search"} // Для доступности
    />
  );
}