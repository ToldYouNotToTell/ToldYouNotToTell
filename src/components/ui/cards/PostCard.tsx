// src/components/posts/PostCard.tsx
'use client';

import React from 'react';
import { Post } from '@/types/post';
import { formatDate } from '@/lib/utils/date';
import { CategoryTag } from '@/components/ui/CategoryTag';
import { RatingStars } from '@/components/ui/RatingStars';
import { usePosts } from '@/contexts/PostsContext';

export type PostCardProps = {
  post: Post;
  onEdit: (updates: Partial<Post>) => void;
  onDelete: () => void;
};

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  // pull votePost from your PostsContext
  const { votePost } = usePosts();

  // supply a userId here (e.g. from your auth or wallet context)
  const userId = 'CURRENT_USER_ID';

  return (
    <div className={`post ${post.boostAmount ? 'boosted' : ''}`} data-id={post.id}>
      {/* Заголовок */}
      <h3>{post.title}</h3>

      {/* Содержание */}
      <p>{post.content}</p>

      {/* Тег категории */}
      {post.category && <CategoryTag category={post.category} />}

      {/* Дата */}
      <div className="post-date">{formatDate(post.date)}</div>

      {/* Действия */}
      <div className="post-actions">
        <button onClick={() => onEdit({ title: post.title })} title="Edit post">
          ✏️
        </button>
        <button onClick={onDelete} title="Delete post">
          🗑️
        </button>
      </div>

      {/* Рейтинг */}
      <div className="rating-container">
        <RatingStars
          postId={post.id}
          initialRating={post.voters.length}
          onRate={(id, newRating) => {
            votePost(id, userId);
          }}
        />
      </div>
    </div>
  );
}