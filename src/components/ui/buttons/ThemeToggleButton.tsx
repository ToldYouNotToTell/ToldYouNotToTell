'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggleButton() {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <i className={currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'}></i>
    </button>
  );
}