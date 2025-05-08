"use client";
import { Timestamp } from "firebase/firestore";
import React, { useState, useEffect, useCallback } from "react";

import PostCard from "@/components/ui/cards/PostCard";
import EmptyState from "@/components/ui/EmptyState";
import { StarIcon } from "@/components/ui/icons";
import { usePosts } from "@/contexts/PostsContext";
import type { Post, PostListProps } from "@/types/post"; // Убрали неиспользуемый Comment

export default function PostList({
  posts = [],
  currentUserId,
  onEdit,
  onDelete,
  onVote,
  onComment,
  onCommentDelete,
  onCommentEdit,
}: PostListProps) {
  const { isPostAuthor } = usePosts();
  const [authorStatus, setAuthorStatus] = useState<Record<string, boolean>>({});

  const checkPostAuthor = useCallback(async (post: Post): Promise<boolean> => {
    if (!post?.id || !isPostAuthor) return false;
    return isPostAuthor(post);
  }, [isPostAuthor]);

  useEffect(() => {
    const updateAuthorStatus = async () => {
      const newStatus: Record<string, boolean> = {};
      
      for (const post of posts) {
        if (post?.id) {
          newStatus[post.id] = await checkPostAuthor(post);
        }
      }
      
      setAuthorStatus(prev => ({ ...prev, ...newStatus }));
    };

    updateAuthorStatus();
  }, [posts, checkPostAuthor]);

  const safeProcessDate = (date: unknown): string => {
    if (date instanceof Timestamp) {
      return date.toDate().toISOString();
    }
    if (date instanceof Date) {
      return date.toISOString();
    }
    if (typeof date === 'string') {
      return new Date(date).toISOString();
    }
    return new Date().toISOString();
  };

  const processPost = (post: Post): Post => {
    return {
      ...post,
      date: safeProcessDate(post.date),
      comments: post.comments?.map(comment => ({
        ...comment,
        date: safeProcessDate(comment.date)
      }))
    };
  };

  if (!posts.length) {
    return (
      <EmptyState
        icon={<StarIcon size={48} filled={false} className="text-gray-400" />}
        title="No posts available"
        description="Be the first to create a post!"
      />
    );
  }

  return (
    <div className="post-list space-y-4">
      {posts.map((post: Post) => {
        if (!post?.id) return null;

        const processedPost = processPost(post);

        return (
          <PostCard
            key={post.id}
            post={processedPost}
            currentUserId={currentUserId}
            isAuthor={authorStatus[post.id] ?? false}
            onEdit={onEdit ? (postId, updates) => onEdit(postId, updates) : undefined}
            onDelete={onDelete ? () => onDelete(post.id) : undefined}
            onVote={onVote ? () => onVote(post.id) : undefined}
            onComment={onComment ? onComment(post.id) : undefined}
            commentsCount={post.comments?.length || 0}
            onCommentDelete={
              onCommentDelete 
                ? (commentId) => onCommentDelete(post.id, commentId) 
                : undefined
            }
            onCommentEdit={
              onCommentEdit
                ? (commentId, newText) => onCommentEdit(post.id, commentId, newText)
                : undefined
            }
          />
        );
      })}
    </div>
  );
}