// src/components/posts/PostActions.tsx
'use client';

import React from 'react';
import type { Post } from '@/types/post';
import BoostButton from '@/components/ui/buttons/BoostButton'

export type PostActionsProps = {
  post: Post; // Используем весь объект
  isAuthor: boolean;
};

export default function PostActions({ post, isAuthor }: PostActionsProps) {
  return (
    <div className="post-actions">
      {isAuthor && <BoostButton postId={Number(post.id)} />} // Приводим к number
    </div>
  );
}