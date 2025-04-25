// src/components/ui/buttons/ToggleCommentsButton.tsx
'use client';

import React from 'react';
import styles from './ToggleCommentsButton.module.css';

interface ToggleCommentsButtonProps {
  isOpen: boolean;
  commentCount: number;
  onClick: () => void;
}

export function ToggleCommentsButton({
  isOpen,
  commentCount,
  onClick,
}: ToggleCommentsButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={`${isOpen ? 'Hide' : 'Show'} comments`}
      title={`${isOpen ? 'Hide' : 'Show'} comments`}
    >
      {commentCount > 0 ? `Comments (${commentCount})` : 'Add comment'}
    </button>
  );
}