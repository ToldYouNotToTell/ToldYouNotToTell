// src/components/ui/buttons/ThemeToggleButton.tsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Кнопка переключения темы (тёмная/светлая).
 * Использует CSS-класс .theme-toggle из ваших стилей.
 */
export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle light/dark theme"
    >
      {/* Иконка меняется в зависимости от текущей темы */}
      <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'} />
    </button>
  );
}