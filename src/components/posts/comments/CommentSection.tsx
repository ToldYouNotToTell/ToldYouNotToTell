"use client";

import { useState } from "react";
import Comment from "./Comment";

export default function CommentSection({
  postId,
  comments,
}: {
  postId: number;
  comments: Comment[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Логика добавления комментария
      setNewComment("");
    }
  };

  return (
    <>
      <button
        className="toggle-comments-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {comments.length > 0 ? `Comments (${comments.length})` : "Add comment"}
      </button>

      {isOpen && (
        <div className="comments">
          {comments.length > 0 && (
            <div className="comment-list">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} postId={postId} />
              ))}
            </div>
          )}

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <button onClick={handleAddComment}>Send</button>
        </div>
      )}
    </>
  );
}
