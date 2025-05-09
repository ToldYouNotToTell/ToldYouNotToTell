"use client";
import React, { useState, useEffect, FormEvent } from "react";

import { CATEGORIES } from "@/lib/constants/categories";

interface PostFormProps {
  mode?: "create" | "edit";
  initialData?: NewPostData;
  onSubmit: (post: NewPostData) => Promise<void>;
  onClose: () => void;
}

export interface NewPostData {
  title: string;
  content: string;
  category?: string;
}

export default function PostForm({
  mode = "create",
  initialData = { title: "", content: "" },
  onSubmit,
  onClose,
}: PostFormProps) {
  const [title, setTitle] = useState(initialData.title);
  const [category, setCategory] = useState(initialData.category);
  const [content, setContent] = useState(initialData.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const titleCount = title.length;
  const contentCount = content.length;

  useEffect(() => {
    setError(null);
  }, [title, content]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || title.length < 10) {
      setError("Title must be at least 10 characters");
      return;
    }
    
    if (!content.trim() || content.length < 100) {
      setError("Content must be at least 100 characters");
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      await onSubmit({ 
        title: title.trim(), 
        content: content.trim(), 
        category: category?.trim() 
      });
      
      if (mode === "create") {
        setTitle("");
        setContent("");
        setCategory(undefined);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit post");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="add-post-form">
      <h2 className="post-form-title">{mode === "create" ? "New Post" : "Edit Post"}</h2>
      
      {error && (
        <div className="post-form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-field">
          <label htmlFor="postTitle" className="form-label">
            Title
          </label>
          <input
            id="postTitle"
            name="title"
            type="text"
            required
            minLength={10}
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            disabled={isSubmitting}
          />
          <div className="char-counter">
            {titleCount}/100 characters
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="postCategory" className="form-label">
            Category
          </label>
          <select
            id="postCategory"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value || undefined)}
            className="category-select" // Добавьте этот класс
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="postContent" className="form-label">
            Content
          </label>
          <textarea
            id="postContent"
            name="content"
            required
            minLength={100}
            maxLength={650}
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            disabled={isSubmitting}
          />
          <div className="char-counter">
            {contentCount}/650 characters
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onClose}
            className="cancel-button"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || title.length < 10 || content.length < 100}
          >
            {isSubmitting ? (
              <span className="button-loading">
                <span className="spinner">↻</span>
                {mode === "create" ? "Publishing..." : "Saving..."}
              </span>
            ) : mode === "create" ? "Publish" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}