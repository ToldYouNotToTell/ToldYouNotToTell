// src/app/main/page.tsx
'use client';

import { useState } from 'react';
import { usePosts } from '@/contexts/PostsContext';
import PostList from '@/components/posts/PostList';
import PostForm from '@/components/posts/PostForm';
import BackToTopButton from '@/components/ui/buttons/BackToTopButton';

export default function MainPage() {
  const { addPost } = usePosts();
  const [isFormOpen, setFormOpen] = useState(false);

  return (
    <div>
      <button className="add-post-btn" onClick={() => setFormOpen(true)}>
        + New Note
      </button>

      {/* Рендерим список постов без пропсов */}
      <PostList />

      {/* Форма добавления, передаём только колбэки */}
      {isFormOpen && (
        <PostForm
          onSubmit={addPost}
          onClose={() => setFormOpen(false)}
        />
      )}

      <BackToTopButton />
    </div>
  );
}