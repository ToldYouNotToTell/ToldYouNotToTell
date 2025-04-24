// src/components/posts/PostForm.tsx
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { usePosts } from '@/contexts/PostsContext';

const CATEGORY_OPTIONS = [
  'Work','Love','Animals','Children','Society','Friendship','Betrayal','Secret',
  'Dark past','Cheating','Dating','Fails','Shame','Guilt','Revenge','Breakdown',
  'Deception','Mistakes','Pain','Repentance','Forbidden','Loneliness','Loss',
  'Temptation','Funny','Risk','Hope','Private thoughts','Observations','Nature',
  'Art','Study','Travel','Business','Mystic','Dreams','Hate','Family','Success',
  'Scary','Jealousy','Happiness','Goodness','Social networks'
];

export default function PostForm({ onClose }: { onClose: () => void }) {
  const { addPost } = usePosts();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [titleCount, setTitleCount] = useState(0);
  const [contentCount, setContentCount] = useState(0);

  useEffect(() => { setTitleCount(title.length); }, [title]);
  useEffect(() => { setContentCount(content.length); }, [content]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title.length < 10 || content.length < 100) {
      alert('Title ≥10 chars и Content ≥100 chars.');
      return;
    }

    // 👇 Здесь передаём только title, category, content
    await addPost({ title, category, content });
    onClose();

    setTitle(''); setCategory(''); setContent('');
  };

  return (
    <div className="add-post-form" id="addPostForm">
      <h2>New Note</h2>
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
          <button type="submit" id="submitBtn">Publish</button>
        </div>
      </form>
    </div>
  );
}