'use client';

import { useState } from 'react';

export default function Comment({ comment, postId }: {
  comment: Comment;
  postId: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleSave = () => {
    // Логика сохранения изменений
    setIsEditing(false);
  };

  return (
    <div className="comment">
      {isEditing ? (
        <>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="comment-edit-input"
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
            <button onClick={() => setIsEditing(true)}>
              <i className="fas fa-edit"></i>
            </button>
            <button onClick={() => deleteComment(postId, comment.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}