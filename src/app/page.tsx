// src/app/main/page.tsx
'use client';

import { useState } from 'react';
import { usePosts } from '@/contexts/PostsContext';
import PostList from '@/components/posts/PostList';
import PostForm from '@/components/posts/PostForm';
import BackToTopButton from '@/components/ui/buttons/BackToTopButton';
import type { Post } from '@/types/post';

export default function MainPage() {
  const { posts, addPost, editPost, deletePost } = usePosts();
  const [isFormOpen, setFormOpen] = useState(false);

  const handleSubmit = async (postData: Omit<Post, 'id' | 'date' | 'voters' | 'comments' | 'orderNumber'>) => {
    await addPost({
      ...postData,
      orderNumber: posts.length + 1,
    });
    setFormOpen(false);
  };

  return (
    <div>
      <button className="add-post-btn" onClick={() => setFormOpen(true)}>
        + New Note
      </button>

      <PostList
        posts={posts}
        onEdit={editPost}
        onDelete={deletePost}
      />

      {isFormOpen && (
        <PostForm
          onSubmit={handleSubmit}
          onClose={() => setFormOpen(false)}
        />
      )}

      <BackToTopButton />
    </div>
  );
}