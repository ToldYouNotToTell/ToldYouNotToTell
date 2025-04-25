// src/components/posts/comments/CommentSection.tsx
'use client';

import React, { useState } from 'react';
import { Comment } from '@/types/comment';
import { CommentSubmitButton } from '@/components/ui/buttons/CommentSubmitButton';
import { ToggleCommentsButton } from '@/components/ui/buttons/ToggleCommentsButton';

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export default function CommentSection({
  postId,
  comments,
  onAddComment,
}: CommentSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <ToggleCommentsButton
        isOpen={isOpen}
        commentCount={comments.length}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="comments-container">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              {comment.text}
            </div>
          ))}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <CommentSubmitButton
            onClick={handleSubmit}
            disabled={!newComment.trim()}
          />
        </div>
      )}
    </div>
  );
}