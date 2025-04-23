'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useWeb3 } from '@/hooks/useWeb3';

type PostsContextType = {
  posts: Post[];
  loading: boolean;
  sortPosts: (type: 'new' | 'top' | 'trending') => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { walletAddress, stakeTier } = useWeb3();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(applyStakingBoost(postsData, stakeTier));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [stakeTier]);

  const sortPosts = (type: 'new' | 'top' | 'trending') => {
    // Логика сортировки
  };

  return (
    <PostsContext.Provider value={{ posts, loading, sortPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

function applyStakingBoost(posts: Post[], stakeTier: number): Post[] {
  return posts.map(post => ({
    ...post,
    trendingScore: post.trendingScore * (1 + stakeTier * 0.2) // +20% за каждый уровень стейкинга
  }));
}