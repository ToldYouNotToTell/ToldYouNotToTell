"use client";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";

import type { Comment as CommentType } from "@/types/post";

interface CommentProps {
  comment: CommentType;
  onDelete?: () => void;
  onEdit?: (newText: string) => Promise<void> | void;
}

export default function Comment({
  comment,
  onDelete,
  onEdit,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleSave = async () => {
    if (!editedText.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    if (editedText !== comment.text && onEdit) {
      await onEdit(editedText);
    }
    setIsEditing(false);
  };

  return (
    <div className="comment">
      {isEditing ? (
        <div className="comment-edit-mode">
          <textarea
            id={`edit-comment-${comment.id}`} // Уникальный ID
            name="editedComment"              // Имя для формы
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="comment-edit-input"
            aria-label="Edit comment"
          />
          <div className="comment-edit-actions">
            <button onClick={handleSave} aria-label="Save">
              <FaCheck />
            </button>
            <button onClick={() => setIsEditing(false)} aria-label="Cancel">
              <FaTimes />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="comment-content">
            <p>{comment.text}</p>
            {(onEdit || onDelete) && (
              <div className="comment-actions">
                {onEdit && (
                  <button onClick={() => setIsEditing(true)} aria-label="Edit">
                    <FaEdit />
                  </button>
                )}
                {onDelete && (
                  <button onClick={onDelete} aria-label="Delete">
                    <FaTrash />
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="comment-meta">
            <span>{new Date(comment.date).toLocaleString()}</span>
          </div>
        </>
      )}
    </div>
  );
}