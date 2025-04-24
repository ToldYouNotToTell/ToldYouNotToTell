// src/components/ui/PostContent.tsx
'use client';

import React from 'react';
import { escapeHtml } from '@/lib/utils/moderate';

export interface PostContentProps {
  /** Содержимое поста (текст) */
  content: string;
}

/**
 * Компонент для вывода текста поста.
 * Использует escapeHtml, чтобы избежать XSS,
 * и сохраняет перенос строк (white-space: pre-wrap).
 */
export default function PostContent({ content }: PostContentProps) {
  return (
    <p className="post-content">
      {escapeHtml(content)}
    </p>
  );
}