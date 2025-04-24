// src/components/ui/PostMetadata.tsx
'use client';

import React from 'react';
import ClockIcon from '@/components/ui/icons/ClockIcon';
import CategoryTag from '@/components/ui/CategoryTag';
import type { Post } from '@/types/post';

export type PostMetadataProps = {
  post: Post;
};

/**
 * Показывает метаданные поста: категорию и дату создания.
 */
export default function PostMetadata({ post }: PostMetadataProps) {
  const { category, date } = post;
  const date = new Date(date);

  const formattedDate = date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="post-metadata" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
      {category && (
        <CategoryTag category={category} />
      )}
      <div className="post-date" style={{ display: 'flex', alignItems: 'center', color: 'var(--icon-color)', fontSize: '12px' }}>
        <ClockIcon size={14} style={{ marginRight: '4px' }} />
        {formattedDate}
      </div>
    </div>
  );
}