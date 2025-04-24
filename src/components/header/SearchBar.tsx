// src/components/header/SearchBar.tsx
'use client';

import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({
  placeholder = 'Search...',
  value = '',
  onSearch
}: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="search-box"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}