// src/components/posts/comments/Comment.tsx
'use client';

import React, { useState } from 'react';
import type { Comment as CommentType } from '@/types/comment';

export type CommentProps = {
  /** Данные комментария */
  comment: CommentType;
  /** ID поста, к которому относится комментарий */
  postId: number;
  /** Опциональный колбэк для удаления комментария */
  onDelete?: (postId: number, commentId: string) => void;
};

export default function Comment({
  comment,
  postId,
  onDelete,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleSave = () => {
    // TODO: API или контекст для сохранения:
    // updateComment(postId, comment.id, editedText)
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete?.(postId, comment.id);
  };

  return (
    <div className="comment">
      {isEditing ? (
        <>
          <label
            htmlFor={`edit-comment-${comment.id}`}
            className="sr-only"
          >
            Edit comment
          </label>
          <textarea
            id={`edit-comment-${comment.id}`}
            value={editedText}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement>
            ) => setEditedText(e.target.value)}
            className="comment-edit-input"
            placeholder="Edit your comment"
            aria-label="Edit comment"
            title="Edit comment"
          />
          <div className="edit-actions">
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </>
      ) : (
        <>
          <div className="comment-text">{comment.text}</div>
          <div className="comment-actions">
            <button
              onClick={() => setIsEditing(true)}
              aria-label="Edit comment"
              title="Edit comment"
            >
              <i className="fas fa-edit" />
            </button>
            <button
              onClick={handleDelete}
              aria-label="Delete comment"
              title="Delete comment"
            >
              <i className="fas fa-trash" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}