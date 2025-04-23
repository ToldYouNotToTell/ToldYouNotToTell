'use client';

import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';

export default function PostForm({ postToEdit, onClose }: {
  postToEdit?: Post;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(postToEdit?.title || '');
  const [content, setContent] = useState(postToEdit?.content || '');
  const [category, setCategory] = useState(postToEdit?.category || '');
  const { addPost, editPost } = usePosts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (postToEdit) {
      editPost(postToEdit.id, { title, content, category });
    } else {
      addPost({
        id: Date.now(),
        title,
        content,
        category,
        voters: [],
        date: new Date(),
        comments: []
      });
    }
    
    onClose();
  };

  return (
    <div className="add-post-form">
      <h2>{postToEdit ? 'Edit Note' : 'New Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
          <div>{title.length}/100</div>
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {/* Опции категорий */}
          </select>
        </div>
        
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={650}
          />
          <div>{content.length}/650</div>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">{postToEdit ? 'Save' : 'Publish'}</button>
        </div>
      </form>
    </div>
  );
}