// src/components/posts/comments/CommentForm.tsx
'use client';

import React, { useState } from 'react';
import { CommentSubmitButton } from '@/components/ui/buttons/CommentSubmitButton';

interface CommentFormProps {
  onSubmit: (text: string) => void | Promise<void>;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <div className="comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Leave a comment..."
      />
      <CommentSubmitButton
        onClick={handleSubmit}
        disabled={!commentText.trim()}
      />
    </div>
  );
}