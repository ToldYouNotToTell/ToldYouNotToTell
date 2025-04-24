'use client';
import React from 'react';
import { sortPosts } from '@/lib/uiActions';

export default function SortNewButton() {
  return (
    <button onClick={() => sortPosts('new')} className="active">
      <i className="fas fa-clock"></i> New
    </button>
  );
}