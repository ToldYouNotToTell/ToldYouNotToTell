// src/contexts/PostsContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Post, Comment } from '@/types/post';
import { UniversalStorage } from '@/lib/api/universalStorage';

// Хелпер для нормализации ID
const normalizeId = (id: number | string): number => {
  if (typeof id === 'number') return id;
  const parsed = parseInt(id, 10);
  if (isNaN(parsed)) throw new Error(`Invalid ID: ${id}`);
  return parsed;
};

export type PostsContextType = {
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
  error: string | null;
  searchPosts: (query: string) => void;
  addPost: (
    post: Omit<Post, 'id' | 'date' | 'voters' | 'comments' | 'orderNumber'>
  ) => Promise<void>;
  editPost: (id: number | string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: number | string) => Promise<void>;
  getPost: (id: number | string) => Post | undefined;
  votePost: (postId: number | string, userId: string) => Promise<void>;
  addComment: (
    postId: number | string,
    text: string,
    userId: string
  ) => Promise<void>;
  ratePost: (postId: number | string) => void;
  reportPost: (postId: number | string) => void;
  sharePostDirect: (
    platform: 'twitter' | 'facebook' | 'telegram' | 'whatsapp',
    postId: number | string
  ) => void;
  copyPostLink: (postId: number | string) => void;
  downloadPostImage: (postId: number | string) => void;
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const storage = new UniversalStorage();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await storage.getPosts();
        // Нормализуем ID при загрузке
        const normalizedPosts = allPosts.map((post) => ({
          ...post,
          id: normalizeId(post.id),
          comments: post.comments.map((comment) => ({
            ...comment,
            id: normalizeId(comment.id),
          })),
        }));
        setPosts(normalizedPosts);
        setFilteredPosts(normalizedPosts);
      } catch (err) {
        setError('Failed to load posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [storage]);

  const addPost = async (
    post: Omit<Post, 'id' | 'date' | 'voters' | 'comments' | 'orderNumber'>
  ) => {
    try {
      setLoading(true);
      const newPost: Post = {
        ...post,
        id: Date.now(),
        date: new Date().toISOString(),
        voters: [],
        comments: [],
        orderNumber: posts.length + 1,
      };
      await storage.addPost(newPost);
      setPosts((prev) => [newPost, ...prev]);
      setFilteredPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      setError('Failed to add post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (id: number | string, updates: Partial<Post>) => {
    try {
      setLoading(true);
      const numericId = normalizeId(id);
      // Передаём ключ-строку
      await storage.updatePost(numericId.toString(), updates);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === numericId ? { ...post, ...updates } : post
        )
      );
      setFilteredPosts((prev) =>
        prev.map((post) =>
          post.id === numericId ? { ...post, ...updates } : post
        )
      );
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number | string) => {
    try {
      setLoading(true);
      const numericId = normalizeId(id);
      await storage.deletePost(numericId.toString());
      setPosts((prev) => prev.filter((post) => post.id !== numericId));
      setFilteredPosts((prev) =>
        prev.filter((post) => post.id !== numericId)
      );
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const votePost = async (postId: number | string, userId: string) => {
    try {
      setLoading(true);
      const numericId = normalizeId(postId);
      const updatedPosts = posts.map((post) => {
        if (post.id === numericId) {
          const hasVoted = post.voters.includes(userId);
          const voters = hasVoted
            ? post.voters.filter((id) => id !== userId)
            : [...post.voters, userId];
          return { ...post, voters };
        }
        return post;
      });
      await storage.updatePost(numericId.toString(), {
        voters: updatedPosts.find((p) => p.id === numericId)?.voters,
      });
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (err) {
      setError('Failed to vote');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (
    postId: number | string,
    text: string,
    userId: string
  ) => {
    try {
      setLoading(true);
      const numericId = normalizeId(postId);
      const newComment: Comment = {
        id: Date.now(),
        text,
        authorId: userId,
        date: new Date().toISOString(),
      };
      const updatedPosts = posts.map((post) =>
        post.id === numericId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      );
      await storage.addComment(numericId.toString(), newComment);
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
    } finally {
      setLoading(false);  // <-- здесь больше нет ошибок на numericId
    }
  };

  const searchPosts = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    setFilteredPosts(
      normalizedQuery
        ? posts.filter(
            (post) =>
              post.title.toLowerCase().includes(normalizedQuery) ||
              post.orderNumber
                .toString()
                .includes(normalizedQuery) ||
              (post.recoveryCode ?? '')
                .toLowerCase()
                .includes(normalizedQuery)
          )
        : posts
    );
  };

  const ratePost = (postId: number | string) => {
    const numericId = normalizeId(postId);
    votePost(numericId, 'anonymous').catch(console.error);
  };

  const reportPost = (postId: number | string) => {
    const numericId = normalizeId(postId);
    console.log(`Reporting post ${numericId}`);
  };

  const sharePostDirect = (
    platform: 'twitter' | 'facebook' | 'telegram' | 'whatsapp',
    postId: number | string
  ) => {
    const numericId = normalizeId(postId);
    const url = `${window.location.origin}/posts/${numericId}`;
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`,
    };
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  };

  const copyPostLink = (postId: number | string) => {
    const numericId = normalizeId(postId);
    const url = `${window.location.origin}/posts/${numericId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => console.log('Link copied'))
      .catch(console.error);
  };

  const downloadPostImage = (postId: number | string) => {
    const numericId = normalizeId(postId);
    console.log(`Downloading image for post ${numericId}`);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        filteredPosts,
        loading,
        error,
        searchPosts,
        addPost,
        editPost,
        deletePost,
        getPost: (id) => posts.find((post) => post.id === normalizeId(id)),
        votePost,
        addComment,
        ratePost,
        reportPost,
        sharePostDirect,
        copyPostLink,
        downloadPostImage,
        setFilteredPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context)
    throw new Error('usePosts must be used within PostsProvider');
  return context;
}