// src/components/ui/buttons/AddPostButton.tsx
'use client';
import React from 'react';

export type AddPostButtonProps = {
  /** Обработчик клика по кнопке */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function AddPostButton({ onClick }: AddPostButtonProps) {
  return (
    <button
      type="button"
      className="add-post-btn"
      onClick={onClick}
    >
      + New Note
    </button>
  );
}