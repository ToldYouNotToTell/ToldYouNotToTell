"use client";

import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";

import type { Post } from "@/types/post";
import "./ScreenshotModal.css"; // Импорт CSS файла

export default function ScreenshotModal({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!screenshotRef.current || isGenerating) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(screenshotRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `ToldYouNotToTell-post-${post.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating screenshot:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
          <div ref={screenshotRef} className="modal-screenshot-content">
            {post.title && <h3 className="modal-post-title">{post.title}</h3>}

            <div className="modal-post-content">{post.content}</div>

            {/* Водяной знак в правом нижнем углу */}
            <div className="modal-watermark">ToldYouNotToTell.com</div>
          </div>

          <div className="modal-download-container">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`modal-download-button ${isGenerating ? "modal-generating" : ""}`}
            >
              <FaDownload size={14} />
              {isGenerating ? "Generating..." : "Download Image"}
            </button>
          </div>

          <button className="modal-close-button" onClick={onClose}>
            <FaTimes size={20} />
          </button>
        </div>
      </div>
    </>
  );
}