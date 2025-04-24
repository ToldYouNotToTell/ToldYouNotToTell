'use client';
import React from 'react';
import { toggleTheme } from '@/lib/uiActions';

export default function ThemeToggleButton() {
  return (
    <button className="theme-toggle" onClick={() => toggleTheme()}>
      <i className="fas fa-moon"></i>
    </button>
  );
}