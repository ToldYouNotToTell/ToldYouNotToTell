"use client";

import { Post } from "@/types/post";

export default function ShareButtons({ post }: { post: Post }) {
  const sharePost = (platform: string) => {
    const text = `${post.title}\n\n${post.content.substring(0, 200)}...`;
    const url = `${window.location.origin}/#post-${post.id}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`,
          "_blank"
        );
        break;
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#post-${post.id}`);
    alert("Post link copied to clipboard!");
  };

  return (
    <div className="share-icons">
      <i
        className="fab fa-x-twitter"
        title="Share on X"
        onClick={() => sharePost("twitter")}
      ></i>
      <i
        className="fab fa-facebook"
        title="Share on Facebook"
        onClick={() => sharePost("facebook")}
      ></i>
      <i
        className="fab fa-telegram"
        title="Share on Telegram"
        onClick={() => sharePost("telegram")}
      ></i>
      <i
        className="fab fa-whatsapp"
        title="Share on WhatsApp"
        onClick={() => sharePost("whatsapp")}
      ></i>
      <i className="fas fa-link" title="Copy link" onClick={copyLink}></i>
    </div>
  );
}
