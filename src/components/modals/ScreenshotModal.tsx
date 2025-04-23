'use client';

import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function ScreenshotModal({ 
  post,
  onClose 
}: {
  post: Post;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const link = document.createElement('a');
      link.download = `ToldYouNotToTell-post-${post.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="screenshot-preview">
      <button className="close-screenshot" onClick={onClose}>&times;</button>
      <div className="screenshot-content" ref={contentRef}>
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div className="watermark">ToldYouNotToTell.com</div>
        </div>
      </div>
      <button 
        onClick={handleDownload}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Download Image
      </button>
    </div>
  );
}