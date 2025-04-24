// src/components/posts/PostList.tsx
'use client';

import { usePosts } from '@/contexts/PostsContext';
import PostCard from '@/components/ui/cards/PostCard';

export default function PostList() {
  const { posts, editPost, deletePost } = usePosts();

  return (
    <div>
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={(updates) => editPost(post.id, updates)}
          onDelete={() => deletePost(post.id)}
        />
      ))}
    </div>
  );
}