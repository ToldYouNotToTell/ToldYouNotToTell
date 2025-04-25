// src/components/ui/cards/PostCard.tsx
'use client';

import React from 'react';
import type { Post } from '@/types/post';
import { formatDate } from '@/lib/utils/date';
import styles from './PostCard.module.css';
import BoostButton from '../buttons/BoostButton';

export type PostCardProps = {
  post: Post;
  isAuthor: boolean;
  onEdit?: (updates: Partial<Post>) => void;
  onDelete?: () => void;
  onVote?: () => void;
};

export default function PostCard({
  post,
  isAuthor,
  onEdit,
  onDelete,
  onVote
}: PostCardProps) {
  const hasVoted = post.voters?.includes('CURRENT_USER_ID') || false;

  return (
    <article className={`${styles.postCard} ${post.boostAmount ? styles.boosted : ''}`}>
      <header className={styles.postHeader}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        {post.category && (
          <span className={styles.postCategory}>{post.category}</span>
        )}
      </header>

      <div className={styles.postContent}>
        <p>{post.content}</p>
      </div>

      <footer className={styles.postFooter}>
        <div className={styles.postMeta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>#{post.orderNumber}</span>
        </div>

        <div className={styles.postActions}>
          {isAuthor && (
            <>
              <BoostButton postId={post.id} />
              {onEdit && (
                <button 
                  onClick={() => onEdit({})}
                  className={styles.actionButton}
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={onDelete}
                  className={styles.actionButton}
                >
                  Delete
                </button>
              )}
            </>
          )}
          
          {onVote && (
            <button 
              onClick={onVote}
              className={`${styles.voteButton} ${hasVoted ? styles.voted : ''}`}
              disabled={hasVoted}
            >
              ★ {post.voters?.length || 0}
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}