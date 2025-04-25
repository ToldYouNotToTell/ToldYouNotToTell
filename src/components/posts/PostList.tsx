// src/components/posts/PostList.tsx
'use client';

import React from 'react';
import { Post } from '@/types/post';
import PostCard from '@/components/ui/cards/PostCard';

interface PostListProps {
  posts: Post[];
  currentUserId?: string;
  onEdit: (id: number, updates: Partial<Post>) => void;
  onDelete: (id: number) => void;
  onVote?: (postId: number) => void;
}

export default function PostList({ 
  posts, 
  currentUserId,
  onEdit, 
  onDelete,
  onVote 
}: PostListProps) {
  const isUserAuthor = (post: Post): boolean => {
    return Boolean(currentUserId && post.authorId === currentUserId);
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isAuthor={isUserAuthor(post)}
          onEdit={isUserAuthor(post) ? (updates) => onEdit(post.id, updates) : undefined}
          onDelete={isUserAuthor(post) ? () => onDelete(post.id) : undefined}
          onVote={onVote ? () => onVote(post.id) : undefined}
        />
      ))}
    </div>
  );
}