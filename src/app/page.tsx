"use client";
import { useState, useCallback } from "react";

import type { NewPostData } from "@/components/posts/PostForm";
import PostForm from "@/components/posts/PostForm";
import PostList from "@/components/posts/PostList";
import { usePosts } from "@/contexts/PostsContext";
import { useWallet } from "@/hooks/useWallet";
import type { Post } from "@/types/post";

export default function MainPage() {
  const {
    filteredPosts,
    addPost,
    editPost,
    deletePost,
    votePost,
    addComment,
    deleteComment,
    editComment,
  } = usePosts();
  
  const { publicKey } = useWallet();
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleFormSubmit = async (postData: NewPostData) => {
    try {
      if (editingPost) {
        await editPost(editingPost.id, postData);
      } else {
        await addPost({
          title: postData.title,
          content: postData.content,
          category: postData.category,
          authorWallet: publicKey?.toString()
        });
      }
      setFormOpen(false);
      setEditingPost(null);
    } catch {
      alert('Operation failed. Please try again.');
    }
  };

  const handleEdit = useCallback(async (postId: string, updates: Partial<Post>) => {
    try {
      await editPost(postId, updates); // Важно: сначала ID, потом updates
    } catch (error) {
      alert(error instanceof Error ? error.message : "Edit failed");
    }
  }, [editPost]);
  
  const handleDelete = useCallback(async (id: string) => {
    try {
      if (!confirm("Are you sure you want to permanently delete this post?")) {
        return;
      }
  
      await deletePost(id);
    } catch {
      alert("Failed to delete post. Please try again later.");
    }
  }, [deletePost]);
  
  const handleVote = useCallback((id: string) => {
    votePost(id, publicKey?.toString() || "anonymous", 1)
      .catch(() => alert("Failed to process your vote. Please try again."));
  }, [votePost, publicKey]);
  
  const handleAddComment = useCallback((postId: string) => async (text: string) => {
    try {
      await addComment(postId, text, publicKey?.toString() || "anonymous");
    } catch {
      alert("Failed to add comment. Please try again.");
    }
  }, [addComment, publicKey]);
  
  const handleDeleteComment = useCallback(async (postId: string, commentId: string) => {
    try {
      await deleteComment(postId, commentId);
    } catch {
      alert("Failed to delete comment. Please try again.");
    }
  }, [deleteComment]);
  
  const handleEditComment = useCallback(async (
    postId: string,
    commentId: string,
    newText: string,
  ) => {
    try {
      await editComment(postId, commentId, newText);
    } catch {
      alert("Failed to edit comment. Please try again.");
    }
  }, [editComment]);

  return (
    <div className="post-container">
      <PostList
        posts={filteredPosts}
        currentUserId={publicKey?.toString()}
        onEdit={(postId, updates) => handleEdit(postId, updates)}
        onDelete={handleDelete}
        onVote={handleVote}
        onComment={handleAddComment}
        onCommentDelete={handleDeleteComment}
        onCommentEdit={handleEditComment}
      />

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PostForm
              mode={editingPost ? "edit" : "create"}
              initialData={
                editingPost
                  ? {
                      title: editingPost.title,
                      content: editingPost.content,
                      category: editingPost.category,
                    }
                  : undefined
              }
              onSubmit={handleFormSubmit}
              onClose={() => {
                setFormOpen(false);
                setEditingPost(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}