// src/components/posts/PostForm.tsx
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { Post } from '@/types/post';

const CATEGORY_OPTIONS = [
  'Work', 'Love', 'Animals', 'Children', 'Society', 'Friendship', 'Betrayal', 'Secret',
  'Dark past', 'Cheating', 'Dating', 'Fails', 'Shame', 'Guilt', 'Revenge', 'Breakdown',
  'Deception', 'Mistakes', 'Pain', 'Repentance', 'Forbidden', 'Loneliness', 'Loss',
  'Temptation', 'Funny', 'Risk', 'Hope', 'Private thoughts', 'Observations', 'Nature',
  'Art', 'Study', 'Travel', 'Business', 'Mystic', 'Dreams', 'Hate', 'Family', 'Success',
  'Scary', 'Jealousy', 'Happiness', 'Goodness', 'Social networks'
];

type PostFormProps = {
  mode?: 'create' | 'edit';
  initialData?: {
    title: string;
    content: string;
    category?: string;
  };
  onSubmit: (post: Omit<Post, 'id' | 'date' | 'voters' | 'comments' | 'orderNumber'>) => Promise<void>;
  onClose: () => void;
};

export default function PostForm({ 
  mode = 'create', 
  initialData = { title: '', content: '', category: '' }, 
  onSubmit, 
  onClose 
}: PostFormProps) {
  const [title, setTitle] = useState(initialData.title);
  const [category, setCategory] = useState(initialData.category || '');
  const [content, setContent] = useState(initialData.content);
  const [titleCount, setTitleCount] = useState(initialData.title.length);
  const [contentCount, setContentCount] = useState(initialData.content.length);

  useEffect(() => { setTitleCount(title.length); }, [title]);
  useEffect(() => { setContentCount(content.length); }, [content]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title.length < 10 || content.length < 100) {
      alert('Title должно быть ≥10 символов и Content ≥100 символов.');
      return;
    }

    await onSubmit({ title, category, content });
    onClose();

    // Сбрасываем поля только при создании нового поста
    if (mode === 'create') {
      setTitle('');
      setCategory('');
      setContent('');
    }
  };

  return (
    <div className="post-form" id={mode === 'create' ? 'addPostForm' : 'editPostForm'}>
      <h2>{mode === 'create' ? 'New Note' : 'Edit Note'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="postTitle">Title</label>
          <input
            id="postTitle"
            type="text"
            required minLength={10} maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div id="titleCounter">{titleCount}/100</div>
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="postCategory">Category</label>
          <select
            id="postCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="form-group">
          <label htmlFor="postContent">Content</label>
          <textarea
            id="postContent"
            required minLength={100} maxLength={650} rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div id="contentCounter">{contentCount}/650</div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" id="submitBtn">
            {mode === 'create' ? 'Publish' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}