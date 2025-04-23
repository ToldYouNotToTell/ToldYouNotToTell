import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { useWeb3 } from '@/hooks/useWeb3';
import { IconX } from '@tabler/icons-react'; // Альтернатива FaTimes

export default function ScreenshotModal({ 
  post,
  onClose 
}: {
  post: Post;
  onClose: () => void;
}) {
  const { captureRef, downloadImage } = useWeb3();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (contentRef.current) {
      await downloadImage(contentRef.current, `ToldYouNotToTell-post-${post.id}`);
    }
  };

  return (
    <div className="screenshot-preview">
      <button className="close-screenshot" onClick={onClose}>
        <IconX size={20} /> {/* Используем иконку из Tabler */}
      </button>
      <div className="screenshot-content" ref={contentRef}>
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div className="watermark">ToldYouNotToTell.com</div>
        </div>
      </div>
      <button 
        className="download-btn" 
        onClick={handleDownload}
        disabled={captureRef.isLoading}
      >
        {captureRef.isLoading ? 'Processing...' : 'Download Image'}
      </button>
    </div>
  );
}