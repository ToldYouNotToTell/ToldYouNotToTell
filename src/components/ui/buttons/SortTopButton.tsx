'use client';
import React from 'react';
import { sortPosts } from '@/lib/uiActions';

export default function SortTopButton() {
  return (
    <button onClick={() => sortPosts('top')}>
      <i className="fas fa-star"></i> Top
    </button>
  );
}