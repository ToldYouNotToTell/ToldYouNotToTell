// src/contexts/PostsContext.tsx
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

export type PostsContextType = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  searchPosts: (query: string) => void;
  addPost: (
    post: Omit<Post, 'id' | 'date' | 'voters' | 'comments' | 'orderNumber'>
  ) => Promise<void>;
  editPost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => Post | undefined;
  votePost: (postId: string, userId: string) => Promise<void>;
  addComment: (
    postId: string,
    text: string,
    userId: string
  ) => Promise<void>;

  // --- новые методы для UI ---
  ratePost: (postId: string, e: React.MouseEvent) => void;
  reportPost: (postId: string) => void;
  sharePostDirect: (
    platform: 'twitter' | 'facebook' | 'telegram' | 'whatsapp',
    postId: string
  ) => void;
  copyPostLink: (postId: string) => void;
  downloadPostImage: (postId: string) => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const storage = new UniversalStorage();

  // Загрузка
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

  // CRUD
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
      setPosts((p) => [newPost, ...p]);
      setFilteredPosts((p) => [newPost, ...p]);
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
      setPosts((p) => p.map((x) => (x.id === id ? { ...x, ...updates } : x)));
      setFilteredPosts((p) =>
        p.map((x) => (x.id === id ? { ...x, ...updates } : x))
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
      setPosts((p) => p.filter((x) => x.id !== id));
      setFilteredPosts((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  // Голосование
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
      setPosts((p) =>
        p.map((x) => (x.id === postId ? { ...x, voters } : x))
      );
      setFilteredPosts((p) =>
        p.map((x) => (x.id === postId ? { ...x, voters } : x))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to vote');
    } finally {
      setLoading(false);
    }
  };

  // Комментарии
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
      setPosts((p) =>
        p.map((x) =>
          x.id === postId ? { ...x, comments: [...x.comments, newComment] } : x
        )
      );
      setFilteredPosts((p) =>
        p.map((x) =>
          x.id === postId ? { ...x, comments: [...x.comments, newComment] } : x
        )
      );
    } catch (err) {
      console.error(err);
      setError('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  // Поиск
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

  // Вспомогательные для UI:
  const ratePost = (postId: string, e: React.MouseEvent) => {
    // тут можно получить текущего userId
    const userId = 'anonymous'; // <-- замените логикой вашего auth
    votePost(postId, userId).catch(console.error);
  };

  const reportPost = (postId: string) => {
    console.log('Report post', postId);
    // сюда вашу логику репорта (firestore, API и т.п.)
  };

  const sharePostDirect = (
    platform: 'twitter' | 'facebook' | 'telegram' | 'whatsapp',
    postId: string
  ) => {
    const url = `${window.location.origin}/?post=${postId}`;
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          url
        )}`;
        break;
    }
    window.open(shareUrl, '_blank');
  };

  const copyPostLink = (postId: string) => {
    const url = `${window.location.origin}/?post=${postId}`;
    navigator.clipboard.writeText(url).catch(console.error);
  };

  const downloadPostImage = (postId: string) => {
    // тут можно использовать html2canvas или ваш flow
    console.log('Download image for', postId);
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
        getPost: (id) => posts.find((x) => x.id === id),
        votePost,
        addComment,

        // новые методы
        ratePost,
        reportPost,
        sharePostDirect,
        copyPostLink,
        downloadPostImage,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}