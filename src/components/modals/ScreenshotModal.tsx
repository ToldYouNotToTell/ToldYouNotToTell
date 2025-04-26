// src/components/modals/ScreenshotModal.tsx
'use client';

import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image'; // Изменённый импорт
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
    
    try {
      // Используем конкретный метод (toPng, toJpeg, etc.)
      const dataUrl = await htmlToImage.toPng(contentRef.current);
      
      const link = document.createElement('a');
      link.download = `ToldYouNotToTell-post-${post.id}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating image:', error);
    }
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
        {/* Ваш контент для скриншота */}
      </div>

      <button className="download-screenshot" onClick={handleDownload}>
        <ReactIcon name="download" prefix="fas" title="Download" /> Download
      </button>
    </div>
  );
}