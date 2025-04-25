// src/components/ui/cards/PostCard.tsx
'use client';

import React from 'react';
import type { Post } from '@/types/post';
import { formatDate } from '@/lib/utils/date';
import BoostButton from '../buttons/BoostButton';
import CommentForm from '@/components/posts/comments/CommentForm';

export type PostCardProps = {
  post: Post;
  isAuthor: boolean;
  onEdit?: (updates: Partial<Post>) => void;
  onDelete?: () => void;
  onVote?: () => void;
  onComment?: (text: string) => Promise<void> | void;
};

export default function PostCard({
  post,
  isAuthor,
  onEdit,
  onDelete,
  onVote,
  onComment,
}: PostCardProps) {
  const hasVoted = post.voters?.includes('CURRENT_USER_ID') || false;

  return (
    <article
      className={`postCard ${post.boostAmount ? 'boosted' : ''}`}
      data-id={post.id}
    >
      <header className="postHeader">
        <h3 className="postTitle">{post.title}</h3>
        {post.category && (
          <span className="postCategory">{post.category}</span>
        )}
      </header>

      <div className="postContent">
        <p>{post.content}</p>
      </div>

      <footer className="postFooter">
        <div className="postMeta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>#{post.orderNumber}</span>
        </div>

        <div className="postActions">
          {isAuthor && (
            <>
              <BoostButton postId={post.id} />
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit({})}
                  className="actionButton"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="actionButton"
                >
                  Delete
                </button>
              )}
            </>
          )}

          {onVote && (
            <button
              type="button"
              onClick={onVote}
              className={`voteButton ${hasVoted ? 'voted' : ''}`}
              disabled={hasVoted}
            >
              ★ {post.voters?.length || 0}
            </button>
          )}
        </div>

        {onComment && (
          <div className="postComments">
            <CommentForm onSubmit={onComment} />
          </div>
        )}
      </footer>
    </article>
  );
}