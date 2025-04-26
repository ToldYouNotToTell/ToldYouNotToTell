// src/components/posts/PostActions.tsx
'use client';

import React from 'react';
import type { Post } from '@/types/post';
import BoostButton from '@/components/ui/buttons/BoostButton';

export type PostActionsProps = {
  post: Post;
  isAuthor: boolean;
};

export default function PostActions({ post, isAuthor }: PostActionsProps) {
  return (
    <div className="post-actions">
      {isAuthor && <BoostButton postId={post.id} />} {/* Убрали Number() */}
    </div>
  );
}