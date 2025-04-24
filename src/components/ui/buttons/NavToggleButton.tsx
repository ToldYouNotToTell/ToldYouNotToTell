// src/components/header/NavToggleButton.tsx
'use client';

import React from 'react';

interface NavToggleButtonProps {
  onClick: () => void;
}

/**
 * Кнопка «гамбургер» для открытия/закрытия NavMenu.
 * Использует CSS-класс .nav-toggle из ваших стилей.
 */
export default function NavToggleButton({ onClick }: NavToggleButtonProps) {
  return (
    <button
      type="button"
      className="nav-toggle"
      onClick={onClick}
      aria-label="Toggle navigation menu"
    >
      <i className="fas fa-bars" />
    </button>
  );
}