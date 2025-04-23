'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post } from '@/types/post';
import { UniversalStorage } from '@/lib/api/universalStorage';

type PostsContextType = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (post: Omit<Post, 'id' | 'date' | 'voters' | 'comments'>) => Promise<void>;
  editPost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => Post | undefined;
  votePost: (postId: string, userId: string) => Promise<void>;
  addComment: (postId: string, text: string, userId: string) => Promise<void>;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storage = new UniversalStorage();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await storage.getPosts();
        setPosts(postsData);
      } catch (err) {
        setError('Failed to load posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (post: Omit<Post, 'id' | 'date' | 'voters' | 'comments'>) => {
    try {
      setLoading(true);
      const newPost = {
        ...post,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        voters: [],
        comments: [],
        orderNumber: posts.length + 1
      };
      await storage.addPost(newPost);
      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      setError('Failed to add post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (id: string, updates: Partial<Post>) => {
    try {
      setLoading(true);
      await storage.updatePost(id, updates);
      setPosts(prev => prev.map(post => 
        post.id === id ? { ...post, ...updates } : post
      ));
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
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const votePost = async (postId: string, userId: string) => {
    try {
      setLoading(true);
      await storage.votePost(postId, userId);
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          const hasVoted = post.voters.includes(userId);
          return {
            ...post,
            voters: hasVoted
              ? post.voters.filter(id => id !== userId)
              : [...post.voters, userId]
          };
        }
        return post;
      }));
    } catch (err) {
      setError('Failed to vote');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId: string, text: string, userId: string) => {
    try {
      setLoading(true);
      const newComment = {
        id: Date.now().toString(),
        text,
        authorId: userId,
        date: new Date().toISOString()
      };
      await storage.addComment(postId, newComment);
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      }));
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPost = (id: string) => posts.find(post => post.id === id);

  return (
    <PostsContext.Provider 
      value={{ 
        posts, 
        loading, 
        error, 
        addPost, 
        editPost, 
        deletePost, 
        getPost,
        votePost,
        addComment
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}