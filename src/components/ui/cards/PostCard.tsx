// src/components/ui/PostCard.tsx
'use client';

import React from 'react';
import { usePosts } from '@/hooks/usePosts';
import { formatDate } from '@/lib/utils/date';
import { escapeHtml } from '@/lib/utils/moderate';
import CommentSection from '@/components/posts/comments/CommentSection';

import {
  FaEdit,
  FaTrash,
  FaHourglassHalf,
  FaFlag,
  FaStar,
  FaTwitter,
  FaFacebook,
  FaTelegram,
  FaWhatsapp,
  FaLink,
  FaDownload,
} from 'react-icons/fa';

export interface Post {
  id: string;
  orderNumber: number;
  title: string;
  content: string;
  category?: string;
  date: string | Date;
  voters?: string[];
  boosted?: boolean;
  comments?: any[];
  authorWallet?: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const {
    editPost,
    deletePost,
    ratePost,
    reportPost,
    sharePostDirect,
    copyPostLink,
    downloadPostImage,
  } = usePosts();

  // подставьте свою логику проверки
  const isAuthor = Boolean(post.authorWallet && post.authorWallet === 'MY_WALLET');
  const hasVoted = false; // должен быть реальный флаг
  const timeLeft = null;  // { hours: 1, minutes: 23 } или null

  return (
    <div className={`post${post.boosted ? ' boosted' : ''}`} data-id={post.id}>
      {/* Редактирование / удаление */}
      {isAuthor && (
        <div className="post-actions">
          <button onClick={() => editPost(post.id)} title="Edit">
            <FaEdit />
          </button>
          <button onClick={() => deletePost(post.id)} title="Delete">
            <FaTrash />
          </button>
        </div>
      )}

      {/* Номер */}
      <div className="post-number">#{post.orderNumber}</div>

      {/* Таймер редактирования */}
      {isAuthor && timeLeft && (
        <div className="edit-timer" title="Time left to edit">
          <FaHourglassHalf style={{ marginRight: 4 }} />
          {timeLeft.hours}h {timeLeft.minutes}m
        </div>
      )}

      {/* Заголовок и текст */}
      <h3>{escapeHtml(post.title)}</h3>
      <p>{escapeHtml(post.content)}</p>

      {/* Категория */}
      {post.category && (
        <span className="category-tag">{post.category}</span>
      )}

      {/* Дата */}
      <div className="post-date">{formatDate(post.date)}</div>

      {/* Кнопка “пожаловаться” */}
      <button
        className="report-button"
        onClick={() => reportPost(post.id)}
        title="Report post"
      >
        <FaFlag />
      </button>

      {/* Рейтинг */}
      <div className="rating-container">
        <FaStar
          className={`star${hasVoted ? ' active' : ''}`}
          onClick={e => ratePost(post.id, e)}
        />
        <span className="star-counter">
          {post.voters?.length ?? 0}
        </span>
      </div>

      {/* Шаринг / копирование / скачивание */}
      <div className="share-icons">
        <FaTwitter title="Share on X" onClick={() => sharePostDirect('twitter', post.id)} />
        <FaFacebook title="Share on Facebook" onClick={() => sharePostDirect('facebook', post.id)} />
        <FaTelegram title="Share on Telegram" onClick={() => sharePostDirect('telegram', post.id)} />
        <FaWhatsapp title="Share on WhatsApp" onClick={() => sharePostDirect('whatsapp', post.id)} />
        <FaLink title="Copy link" onClick={() => copyPostLink(post.id)} />
        <FaDownload title="Download image" onClick={() => downloadPostImage(post.id)} />
      </div>

      {/* Комментарии */}
      <CommentSection postId={post.id} comments={post.comments ?? []} />
    </div>
  );
}