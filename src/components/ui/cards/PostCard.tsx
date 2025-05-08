"use client";
import { Timestamp } from "firebase/firestore";
import React, { useState, useRef } from "react";
import { FaTimes, FaCheck, FaShieldAlt, FaHourglassHalf, FaComment, FaDownload, FaEdit, FaTrash } from "react-icons/fa";

import ScreenshotModal from "@/components/modals/ScreenshotModal";
import Comment from "@/components/posts/comments/Comment";
import CommentForm from "@/components/posts/comments/CommentForm";
import ShareButtons from "@/components/posts/ShareButtons";
import { CategoryTag } from "@/components/ui/CategoryTag";
import EmptyState from "@/components/ui/EmptyState";
import { StarIcon, FireIcon } from "@/components/ui/icons";
import { LazyLoad } from "@/components/ui/LazyLoad";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import Watermark from "@/components/ui/Watermark";
import { usePosts } from "@/contexts/PostsContext";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  isAuthor: boolean;
  isModerator?: boolean;
  isTrending?: boolean;
  isLoading?: boolean;
  commentsCount?: number;
  onEdit?: (postId: string, updates: Partial<Post>) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  onVote?: () => Promise<void> | void;
  onComment?: (text: string) => Promise<void> | void;
  onCommentDelete?: (commentId: string) => Promise<void> | void;
  onCommentEdit?: (commentId: string, newText: string) => Promise<void> | void;
}

export default function PostCard({
  post,
  currentUserId,
  isAuthor,
  isModerator: propIsModerator = false,
  isTrending = false,
  isLoading = false,
  commentsCount = 0,
  onEdit,
  onDelete,
  onVote,
  onComment,
  onCommentDelete,
  onCommentEdit,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [localVoteCount, setLocalVoteCount] = useState(
    post.positiveVotesCount || 0
  );
  const [hasVoted, setHasVoted] = useState(
    currentUserId ? post.votes[currentUserId] === 1 : false
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isSaving, setIsSaving] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);
  const { isModerator: contextIsModerator } = usePosts();
  const isModerator = propIsModerator || contextIsModerator;

  const postDate = post.date
    ? typeof post.date === "string"
      ? new Date(post.date)
      : "toDate" in post.date
        ? (post.date as Timestamp).toDate()
        : post.date
    : null;

  const handleVote = async () => {
    if (!onVote) return;
    try {
      await onVote();
      setHasVoted(prev => !prev);
      setLocalVoteCount(prev => hasVoted ? prev - 1 : prev + 1);
    } catch {
      alert("Failed to process your vote. Please try again.");
    }
  };
  
  const handleDelete = async () => {
    if (!onDelete) return;
    
    try {
      if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
        return;
      }
      
      setIsDeleting(true);
      await onDelete();
    } catch {
      alert("Failed to delete post. Please try again later.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditToggle = () => {
    if (!canEditDelete()) {
      alert("Editing time has expired (3 hours limit)");
      return;
    }
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = async () => {
    if (!onEdit || isSaving) return;
    
    setIsSaving(true);
    
    try {
      await onEdit(post.id, {
        title: editedTitle,
        content: editedContent
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };


  const handleCancelEdit = () => {
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const canEditDelete = () => {
    if (isModerator) return true;
    if (!postDate || !isAuthor) return false;
    
    const threeHoursLater = new Date(postDate.getTime() + 3 * 60 * 60 * 1000);
    return new Date() < threeHoursLater;
  };

  const formatTimeLeft = (date: Date): string => {
    const now = new Date();
    const endTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    const diffMs = endTime.getTime() - now.getTime();
    
    if (diffMs <= 0) return "0h 0m left";
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}h ${diffMinutes}m left`;
  };

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (!post) {
    return (
      <EmptyState
        icon={<StarIcon size={48} filled={false} className="text-gray-400" />}
        title="No post found"
        description="The post you're looking for doesn't exist or may have been deleted"
      />
    );
  }

  return (
    <>
      <LazyLoad placeholder={<PostSkeleton />}>
        <article className="post-card" ref={postRef}>
          <div className="post-card-header">
            <div className="post-card-meta">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="post-edit-title"
                />
              ) : (
                <h3 className="post-card-title">
                  {post.title}
                  {isTrending && (
                    <FireIcon size={16} className="trending-icon text-gray-400" />
                  )}
                  {isModerator && <span className="moderator-badge">⭐</span>}
                </h3>
              )}
  
              <div className="category-tag">
                {post.category && <CategoryTag category={post.category} />}
              </div>
            </div>
  
            <div className="post-card-header-right">
              {(isAuthor || isModerator) && canEditDelete() && (
                <div className="post-card-edit-controls" style={{ display: 'flex', gap: '8px' }}>
                  {onEdit && (
                    <>
                      {isEditing ? (
                        <>
                          <button
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              cursor: 'pointer',
                              display: 'flex',
                              color: isModerator ? "#4f46e5" : "#4B5563",
                              alignItems: 'center',
                            }}
                            onClick={handleSaveEdit}
                            title="Save changes"
                            aria-label="Save changes"
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <span className="loading-spinner" /> // Добавьте стили для спиннера
                            ) : (
                              <FaCheck className={isModerator ? "text-indigo-600" : "text-gray-600"} />
                            )}
                          </button>
                          <button
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              cursor: 'pointer',
                              display: 'flex',
                              color: isModerator ? "#4f46e5" : "#4B5563",
                              alignItems: 'center',
                            }}
                            onClick={handleCancelEdit}
                            title="Cancel editing"
                            aria-label="Cancel editing"
                            disabled={isSaving}
                          >
                            <FaTimes className={isModerator ? "text-indigo-600" : "text-gray-600"} />
                          </button>
                        </>
                      ) : (
                        <button
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            display: 'flex',
                            color: isModerator ? "#4f46e5" : "#4B5563",
                            alignItems: 'center',
                            pointerEvents: isDeleting ? 'none' : 'auto'
                          }}
                          onClick={handleEditToggle}
                          title={isModerator ? "Moderate post" : "Edit post"}
                          aria-label={isModerator ? "Moderate post" : "Edit post"}
                          disabled={isDeleting}
                        >
                          {isModerator ? (
                            <FaShieldAlt className="text-indigo-600" />
                          ) : (
                            <FaEdit className="text-gray-600" />
                          )}
                        </button>
                      )}
                    </>
                  )}
                  {onDelete && (
                    <button
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        display: 'flex',
                        color: isModerator ? "#4f46e5" : "#4B5563",
                        alignItems: 'center'
                      }}
                      onClick={handleDelete}
                      title={isModerator ? "Remove post (moderator)" : "Delete post"}
                      aria-label={isModerator ? "Remove post (moderator)" : "Delete post"}
                      disabled={isDeleting || isEditing}
                    >
                      <FaTrash className={isModerator ? "text-indigo-600" : "text-gray-600"} />
                    </button>
                  )}
                </div>
              )}
              <span className="post-card-number">{post.shortId}</span>
            </div>
          </div>
  
          <div className="post-card-content">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="post-edit-content"
              />
            ) : (
              <>
                <p>{post.content}</p>
                <Watermark />
              </>
            )}
          </div>
  
          <div className="post-card-actions">
            <div className="post-card-left-actions">
              <div className="post-date">
                <span className="post-date">{postDate && formatDate(postDate)}</span>
              </div>
              <div className="share-download-buttons" style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
                <ShareButtons post={post} />
                <button 
                  className="download-button" 
                  onClick={() => setShowScreenshotModal(true)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  disabled={isEditing}
                >
                  <FaDownload size={14} className="text-gray-400 hover:text-blue-500" />
                </button>
              </div>
            </div>
  
            <div className="post-card-right-actions" style={{ 
              display: 'flex',
              alignItems: 'center',
              marginTop: '25px',
              gap: '12px'
            }}>
              <button 
                className="comments-button" 
                onClick={() => setShowComments(!showComments)}
                disabled={isEditing}
              >
                <FaComment size={14} className="text-gray-400" />
                <span className="comment-count text-gray-400">{commentsCount}</span>
              </button>
              
              <button
                className={`vote-button ${hasVoted ? "voted" : ""}`}
                onClick={handleVote}
                disabled={!onVote || isEditing}
                aria-label={hasVoted ? "Remove vote" : "Add vote"}
              >
                <StarIcon 
                  filled={hasVoted} 
                  size={16}
                  style={{
                    color: hasVoted 
                      ? "var(--star-color, #f5b106)" 
                      : "var(--star-counter-color, #aab2bd)"
                  }}
                />
                <span className="vote-count">{localVoteCount}</span>
              </button>
            </div>
          </div>
  
          {showComments && (
            <div className="post-card-comments">
              {onComment && (
                <CommentForm
                  onSubmit={onComment}
                  onClose={() => setShowComments(false)}
                />
              )}
              {post.comments?.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onDelete={onCommentDelete ? () => onCommentDelete(comment.id) : undefined}
                  onEdit={onCommentEdit ? (newText) => onCommentEdit(comment.id, newText) : undefined}
                />
              ))}
            </div>
          )}
          
          {isAuthor && postDate && (
            <div className="edit-time-indicator">
              <FaHourglassHalf className="hourglass-icon" />
              <span className="time-left">
                {canEditDelete() ? formatTimeLeft(postDate) : "Editing expired"}
              </span>
            </div>
          )}
        </article>
      </LazyLoad>
      {showScreenshotModal && (
        <ScreenshotModal
          post={post}
          onClose={() => setShowScreenshotModal(false)}
        />
      )}
    </>
  );
}