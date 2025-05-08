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

  // Автоматический подсчет символов
  const titleCount = title.length;
  const contentCount = content.length;

  // Сбрасываем ошибку при изменении полей
  useEffect(() => {
    setError(null);
  }, [title, content]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Валидация
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
      <h2>{mode === "create" ? "New Post" : "Edit Post"}</h2>
      
      {error && (
        <div className="error-message mb-4 p-2 text-red-600 bg-red-100 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="postTitle" className="block mb-2 font-medium">
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
            className="w-full p-2 border rounded"
            disabled={isSubmitting}
          />
          <div className="text-sm text-gray-500 mt-1">
            {titleCount}/100 characters
          </div>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="postCategory" className="block mb-2 font-medium">
            Category
          </label>
          <select
            id="postCategory"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value || undefined)}
            className="w-full p-2 border rounded"
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

        <div className="form-group mb-6">
          <label htmlFor="postContent" className="block mb-2 font-medium">
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
            className="w-full p-2 border rounded"
            disabled={isSubmitting}
          />
          <div className="text-sm text-gray-500 mt-1">
            {contentCount}/650 characters
          </div>
        </div>

        <div className="form-actions flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cancel-btn px-4 py-2 border rounded"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={isSubmitting || title.length < 10 || content.length < 100}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2">↻</span>
                {mode === "create" ? "Publishing..." : "Saving..."}
              </span>
            ) : mode === "create" ? "Publish" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}