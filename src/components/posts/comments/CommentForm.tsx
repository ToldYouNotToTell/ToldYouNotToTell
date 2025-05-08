"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

import Textarea from "@/components/ui/Inputs/Textarea";

interface CommentFormProps {
  onSubmit: (text: string) => void | Promise<void>;
  onClose?: () => void;
  maxLength?: number;
  className?: string;
}

export default function CommentForm({
  onSubmit,
  onClose,
  maxLength = 500,
  className = "",
}: CommentFormProps) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (commentText.trim()) {
      setIsSubmitting(true);
      try {
        await onSubmit(commentText);
        setCommentText("");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form className={`comment-form ${className}`} onSubmit={handleSubmit}>
      <div className="comment-form-header">
        <h3>Add Comment</h3>
        {onClose && (
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close comment form"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <Textarea
        value={commentText}
        onChange={setCommentText}
        placeholder="Leave a comment..."
        rows={3}
        minLength={1}
        maxLength={maxLength}
        aria-label="Comment text"
      />

      <div className="form-actions">
        <button
          type="submit"
          className="comment-submit-btn"
          disabled={!commentText.trim() || isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
