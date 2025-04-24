"use client";

import { Post } from "@/types/post";
import Watermark from "@/components/ui/Watermark";

export default function PostPreview({
  post,
  onClose,
  onConfirm,
}: {
  post: Omit<Post, "id" | "date">;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="preview-modal">
      <div className="preview-content">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {post.category && <span className="category-tag">{post.category}</span>}
        <Watermark />

        <div className="preview-actions">
          <button onClick={onClose}>Edit</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
