// src/components/modals/ScreenshotModal.tsx
'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { ReactIcon } from '@/components/ui/icons/ReactIcon';
import type { Post } from '@/types/post';

type ScreenshotModalProps = {
  post: Post;
  onClose: () => void;
};

export default function ScreenshotModal({
  post,
  onClose,
}: ScreenshotModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    // Рендерим элемент в канвас
    const canvas = await html2canvas(contentRef.current);
    // Создаём ссылку для скачивания
    const link = document.createElement('a');
    link.download = `ToldYouNotToTell-post-${post.id}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="screenshot-modal">
      <button
        className="close-screenshot"
        onClick={onClose}
        aria-label="Close screenshot modal"
      >
        <ReactIcon name="times" prefix="fas" title="Close" />
      </button>

      <div className="screenshot-content" ref={contentRef}>
        {/* Здесь ваш компонент предпросмотра, например: */}
        {/* <PostCard post={post} /> */}
      </div>

      <button className="download-screenshot" onClick={handleDownload}>
        <ReactIcon name="download" prefix="fas" title="Download" /> Download
      </button>
    </div>
  );
}