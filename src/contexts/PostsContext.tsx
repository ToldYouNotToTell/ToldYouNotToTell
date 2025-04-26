// src/contexts/PostsContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post, Comment } from '@/types/post';
import { UniversalStorage } from '@/lib/api/universalStorage';

export type SortType = 'new' | 'top' | 'random' | 'trending';

export type PostsContextType = {
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
  error: string | null;
  searchPosts: (query: string) => void;
  addPost: (post: Omit<Post, 'id' | 'date' | 'voters' | 'comments'>) => Promise<void>;
  editPost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => Post | undefined;
  votePost: (postId: string, userId: string) => Promise<void>;
  addComment: (postId: string, text: string, userId: string) => Promise<void>;
  ratePost: (postId: string) => Promise<void>; // Добавлено
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  sortType: SortType;
  setSortType: React.Dispatch<React.SetStateAction<SortType>>;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>('new');

  const storage = new UniversalStorage();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const loadedPosts = await storage.getPosts();
        setPosts(loadedPosts);
        setFilteredPosts(loadedPosts);
      } catch (err) {
        setError('Failed to load posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const addPost = async (post: Omit<Post, 'id' | 'date' | 'voters' | 'comments'>) => {
    try {
      setLoading(true);
      const newPost = {
        ...post,
        date: new Date().toISOString(),
        voters: [],
        comments: [],
      };
      const id = await storage.addPost(newPost);
      const createdPost = { ...newPost, id };
      setPosts(prev => [createdPost, ...prev]);
      setFilteredPosts(prev => [createdPost, ...prev]);
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (id: string, updates: Partial<Post>) => {
    try {
      setLoading(true);
      await storage.updatePost(id, updates);
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, ...updates } : post))
      );
      setFilteredPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, ...updates } : post))
      );
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      await storage.deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      setFilteredPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const votePost = async (postId: string, userId: string): Promise<void> => {
    try {
      setLoading(true);
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const hasVoted = post.voters.includes(userId);
          const voters = hasVoted
            ? post.voters.filter((id) => id !== userId)
            : [...post.voters, userId];
          return { ...post, voters };
        }
        return post;
      });
      await storage.updatePost(postId, {
        voters: updatedPosts.find((p) => p.id === postId)?.voters,
      });
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId: string, text: string, userId: string) => {
    try {
      setLoading(true);
      const newComment: Comment = {
        id: Date.now().toString(), // string ID
        text,
        authorId: userId,
        date: new Date().toISOString(),
      };
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      );
      await storage.addComment(postId, newComment);
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    setFilteredPosts(
      normalizedQuery
        ? posts.filter(
            (post) =>
              post.title.toLowerCase().includes(normalizedQuery) ||
              post.orderNumber.toString().includes(normalizedQuery) ||
              (post.recoveryCode ?? '').toLowerCase().includes(normalizedQuery)
          ) 
        : posts
    );
  };

  const ratePost = async (postId: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        await votePost(postId, 'anonymous');
        resolve();
      } catch (error) {
        console.error('Rating failed:', error);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  const reportPost = (postId: string) => {
    console.log(`Reporting post ${postId}`);
  };

  const sharePostDirect = (
    platform: 'twitter' | 'facebook' | 'telegram' | 'whatsapp',
    postId: string
  ) => {
    const url = `${window.location.origin}/posts/${postId}`;
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`,
    };
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  };

  const copyPostLink = (postId: string) => {
    const url = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => console.log('Link copied'))
      .catch(console.error);
  };

  const downloadPostImage = (postId: string) => {
    console.log(`Downloading image for post ${postId}`);
  };

  return (
    <PostsContext.Provider value={{
      posts,
      filteredPosts,
      loading,
      error,
      addPost,
      editPost,
      deletePost,
      getPost: (id) => posts.find(p => p.id === id),
      votePost,
      addComment,
      ratePost, // Теперь точно возвращает Promise<void>
      searchPosts,
      setFilteredPosts,
      sortType,
      setSortType,
    }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within PostsProvider');
  return context;
}