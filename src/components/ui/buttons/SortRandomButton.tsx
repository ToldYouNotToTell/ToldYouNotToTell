'use client';
import React from 'react';
import { sortPosts } from '@/lib/uiActions';

export default function SortRandomButton() {
  return (
    <button onClick={() => sortPosts('random')}>
      <i className="fas fa-random"></i> Random
    </button>
  );
}