'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Post } from '@/types/post';
import { UniversalStorage } from '@/lib/api/universalStorage';

type PostsContextType = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  searchPosts: (query: string) => void;
  // Здесь разрешаем передавать только title, category и content
  addPost: (
    post: Omit<Post, 'id' | 'date' | 'voters' | 'comments' | 'orderNumber'>
  ) => Promise<void>;
  editPost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => Post | undefined;
  votePost: (postId: string, userId: string) => Promise<void>;
  addComment: (postId: string, text: string, userId: string) => Promise<void>;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const storage = new UniversalStorage();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const all = await storage.getPosts();
        setPosts(all);
        setFilteredPosts(all);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [storage]);

  const addPost = async (
    post: Omit<Post, 'id' | 'date' | 'voters' | 'comments' | 'orderNumber'>
  ) => {
    try {
      setLoading(true);
      const newPost: Post = {
        ...post,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        voters: [],
        comments: [],
        orderNumber: posts.length + 1,
      };
      await storage.addPost(newPost);
      setPosts((prev) => [newPost, ...prev]);
      setFilteredPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      console.error(err);
      setError('Failed to add post');
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (id: string, updates: Partial<Post>) => {
    try {
      setLoading(true);
      await storage.updatePost(id, updates);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
      setFilteredPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      await storage.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setFilteredPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  const votePost = async (postId: string, userId: string) => {
    try {
      setLoading(true);
      const p = posts.find((x) => x.id === postId);
      if (!p) throw new Error('Post not found');
      const has = p.voters.includes(userId);
      const voters = has
        ? p.voters.filter((id) => id !== userId)
        : [...p.voters, userId];
      await storage.updatePost(postId, { voters });
      setPosts((prev) =>
        prev.map((x) => (x.id === postId ? { ...x, voters } : x))
      );
      setFilteredPosts((prev) =>
        prev.map((x) => (x.id === postId ? { ...x, voters } : x))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to vote');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (
    postId: string,
    text: string,
    userId: string
  ) => {
    try {
      setLoading(true);
      const newComment = {
        id: Date.now().toString(),
        text,
        authorId: userId,
        date: new Date().toISOString(),
      };
      await storage.addComment(postId, newComment);
      setPosts((prev) =>
        prev.map((x) =>
          x.id === postId
            ? { ...x, comments: [...x.comments, newComment] }
            : x
        )
      );
      setFilteredPosts((prev) =>
        prev.map((x) =>
          x.id === postId
            ? { ...x, comments: [...x.comments, newComment] }
            : x
        )
      );
    } catch (err) {
      console.error(err);
      setError('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const getPost = (id: string) => posts.find((p) => p.id === id);

  const searchPosts = (query: string) => {
    if (!query.trim()) {
      setFilteredPosts(posts);
      return;
    }
    const q = query.toLowerCase();
    setFilteredPosts(
      posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.orderNumber.toString().includes(q) ||
          p.recoveryCode?.toLowerCase().includes(q)
      )
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts:
          filteredPosts.length > 0 || filteredPosts.length !== posts.length
            ? filteredPosts
            : posts,
        loading,
        error,
        searchPosts,
        addPost,
        editPost,
        deletePost,
        getPost,
        votePost,
        addComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be inside PostsProvider');
  return ctx;
}