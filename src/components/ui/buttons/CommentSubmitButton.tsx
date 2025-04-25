// src/components/ui/buttons/CommentSubmitButton.tsx
'use client';

import React from 'react';

export type CommentSubmitButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export function CommentSubmitButton({
  disabled = false,
  onClick,
}: CommentSubmitButtonProps) {
  return (
    <button
      type="button"
      className={`comment-submit-btn ${disabled ? 'opacity-50' : 'hover:bg-blue-600'}`}
      disabled={disabled}
      onClick={onClick}
      aria-label="Submit comment"
    >
      <i className="fas fa-paper-plane mr-2" />
      Send
    </button>
  );
}