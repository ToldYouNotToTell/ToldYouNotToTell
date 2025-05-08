"use client";
import { 
  Timestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData
} from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

import { useWallet } from "@/hooks/useWallet";
import { UniversalStorage } from "@/lib/api/universalStorage";
import { CATEGORIES } from "@/lib/constants/categories";
import { db } from "@/lib/firebase";
import { BoostTier } from "@/types/boost";
import { Post } from "@/types/post";

export type SortType = "new" | "top" | "random" | "trending";

export type PostsContextType = {
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
  error: string | null;
  sortType: SortType;
  isAddPostFormVisible: boolean;
  addPostFormData: {
    title: string;
    content: string;
    category: string;
  };
  setSortType: (type: SortType) => void;
  searchPosts: (query: string) => void;
  addPost: (post: {
    title: string;
    content: string;
    category?: string;
    authorWallet?: string;
  }) => Promise<Post>;
  isPostAuthor: (post: Post) => Promise<boolean>;
  editPost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPostsByWallet: (wallet: string) => Promise<Post[]>;
  getPostsByIp: () => Promise<Post[]>;
  votePost: (postId: string, userIp: string, value: 1 | -1) => Promise<void>;
  addComment: (postId: string, text: string, userIp: string) => Promise<void>;
  deleteComment: (postId: string, commentId: string) => Promise<void>;
  editComment: (postId: string, commentId: string, newText: string) => Promise<void>;
  ratePost: (postId: string) => Promise<void>;
  boostPost: (postId: string, tier: BoostTier) => Promise<void>;
  sortPosts: (type: SortType) => void;
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  showAddPostForm: () => void;
  hideAddPostForm: () => void;
  setAddPostFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    content: string;
    category: string;
  }>>;
  handleAddPostSubmit: (publicKey?: string) => Promise<Post>;
  CATEGORIES: string[];
  moderatePost: (postId: string, action: 'approve' | 'reject', note?: string) => Promise<void>;
  getPostsForModeration: () => Promise<Post[]>;
  isModerator: boolean;
};

const getUserIP = async (): Promise<string> => {
  try {
    const cachedIp = localStorage.getItem('userIp');
    if (cachedIp) return cachedIp;

    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('IP fetch failed');
    
    const data = await response.json();
    const freshIp = data.ip ? String(data.ip) : 'unknown-ip';
    
    localStorage.setItem('userIp', freshIp);
    return freshIp;
  } catch {
    return 'unknown-ip';
  }
};

const MODERATOR_ADDRESSES = [
  "HLnfXjiHy8tjiXUUPZRW6WXuc4qNgK4QEgPBxdV3empw"
];

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>("new");
  const [isAddPostFormVisible, setIsAddPostFormVisible] = useState(false);
  const [addPostFormData, setAddPostFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const { publicKey } = useWallet();
  const storage = useMemo(() => new UniversalStorage(), []);
  const isModerator = useMemo(() => {
    return publicKey ? MODERATOR_ADDRESSES.includes(publicKey.toString()) : false;
  }, [publicKey]);

  // 1. Загрузка постов с обработкой ошибок
  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"), 
      orderBy("orderNumber", "desc")
    );
  
    const unsubscribe = onSnapshot(
      postsQuery, 
      (snapshot) => {
        const loadedPosts = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            ...storage.parsePostData(doc.id, data),
            date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
            boostTime: data.boostTime 
              ? data.boostTime instanceof Timestamp 
                ? data.boostTime.toDate() 
                : new Date(data.boostTime) 
              : null,
            currentBoostWeight: data.currentBoostWeight ? Number(data.currentBoostWeight) : null
          };
        });
        setPosts(loadedPosts);
        setFilteredPosts(loadedPosts);
        setLoading(false);
      },
      () => { 
        setError("Failed to load posts");
        setLoading(false);
      }
    );
  
    return () => unsubscribe();
  }, [storage]);

  const addPost = async (postData: {
    title: string;
    content: string;
    category?: string;
    authorWallet?: string;
  }): Promise<Post> => {
    setLoading(true);
    try {
      const ip = await getUserIP();
      const newPost: Omit<Post, 'id'> = {
        ...postData,
        shortId: Math.random().toString(36).slice(2, 8).toUpperCase(),
        date: Timestamp.now(),
        authorIp: postData.authorWallet ? null : ip,
        authorWallet: postData.authorWallet || null,
        votes: {},
        positiveVotesCount: 0,
        comments: [],
        orderNumber: posts.length + 1,
        status: 'pending',
        moderatedBy: null,
        moderatorNote: null,
        boostTier: null,
        boostAmount: null,
        boostTime: null,
        currentBoostWeight: null,
      };
  
      const createdPostId = await storage.addPost(newPost);
      return { 
        ...newPost, 
        id: createdPostId
      };
    } catch {
      throw new Error("Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  const isPostAuthor = async (post: Post): Promise<boolean> => {
    if (!post) return false;
    
    // Для новых постов (еще не сохраненных)
    if (!post.id) return true;
  
    // Для авторизованных пользователей - проверка по кошельку
    if (post.authorWallet && publicKey) {
      return post.authorWallet === publicKey.toString();
    }
  
    // Для анонимных - проверка по IP
    try {
      const currentIp = await getUserIP();
      return post.authorIp === currentIp; // Сравниваем напрямую IP
    } catch {
      return false;
    }
  };

  const editPost = async (id: string, updates: Partial<Post>) => {
    setLoading(true);
    try {
      const post = posts.find(p => p.id === id);
      if (!post) throw new Error("Post not found");
  
      // Проверка авторства
      const isAuthorByWallet = publicKey && post.authorWallet === publicKey.toString();
      const isAuthorByIp = !post.authorWallet && (await getUserIP()) === post.authorIp;
      const isModerator = publicKey ? MODERATOR_ADDRESSES.includes(publicKey.toString()) : false;
  
      if (!isAuthorByWallet && !isAuthorByIp && !isModerator) {
        throw new Error("You are not authorized to edit this post");
      }
  
      // Проверка временного окна для всех
      const postDate = post.date instanceof Timestamp 
        ? post.date.toDate() 
        : new Date(post.date);
      const threeHoursInMs = 3 * 60 * 60 * 1000;
      if (Date.now() - postDate.getTime() > threeHoursInMs) {
        throw new Error("Posts can only be edited within 3 hours of creation");
      }
  
      await storage.updatePost(id, updates);
      setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
      setFilteredPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Failed to edit post");
    } finally {
      setLoading(false);
    }
  };  

  const handleAddPostSubmit = async (publicKey?: string): Promise<Post> => {
    const post = await addPost({
      title: addPostFormData.title,
      content: addPostFormData.content,
      ...(addPostFormData.category && { category: addPostFormData.category }),
      ...(publicKey && { authorWallet: publicKey }),
    });
    setIsAddPostFormVisible(false);
    setAddPostFormData({ title: "", content: "", category: "" });
    return post;
  };

  const deletePost = async (id: string): Promise<void> => {
  setLoading(true);
  try {
    const post = posts.find(p => p.id === id);
    if (!post) throw new Error("Post not found");

    // Проверка авторства
    const isAuthor = await isPostAuthor(post);
    if (!isAuthor && !isModerator) {
      throw new Error("You are not authorized to delete this post");
    }

    // Проверка временного окна (3 часа)
    const postDate = post.date instanceof Timestamp 
      ? post.date.toDate() 
      : new Date(post.date);
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    if (Date.now() - postDate.getTime() > threeHoursInMs && !isModerator) {
      throw new Error("Posts can only be deleted within 3 hours of creation");
    }

    await storage.deletePost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
    setFilteredPosts(prev => prev.filter(p => p.id !== id));
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Failed to delete post");
  } finally {
    setLoading(false);
  }
};


  const getPostsByIp = async (): Promise<Post[]> => {
    try {
      const currentIp = await getUserIP();
      return posts.filter(post => 
        post.authorIp === currentIp && 
        !post.authorWallet
      );
    } catch {
      return [];
    }
  };

  const getPostsByWallet = async (wallet: string): Promise<Post[]> => {
    return posts.filter(post => post.authorWallet === wallet);
  };  

  const votePost = async (postId: string, userIp: string, value: 1 | -1) => {
    setLoading(true);
    try {
      await storage.votePost(postId, userIp, value);
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          const newVotes = { ...post.votes, [userIp]: value };
          return {
            ...post,
            votes: newVotes,
            positiveVotesCount: Object.values(newVotes).reduce(
              (sum, val) => sum + (val > 0 ? 1 : 0), 0
            )
          };
        }
        return post;
      }));
    } catch {
      throw new Error("Failed to vote");
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId: string, text: string) => {
    setLoading(true);
    try {
      const userIp = await getUserIP(); // Получаем IP здесь
      
      const newComment = {
        id: Date.now().toString(),
        text,
        authorIp: userIp,
        date: new Date().toISOString()
      };
  
      await storage.addComment(postId, newComment);
      
      setPosts(prev => prev.map(post => 
        post.id === postId
          ? { 
              ...post, 
              comments: [...post.comments, newComment] 
            }
          : post
      ));
    } catch {
      setError("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (postId: string, commentId: string) => {
    setLoading(true);
    try {
      const userIp = await getUserIP();
      await storage.deleteComment(postId, commentId, userIp);
      
      setPosts(prev => prev.map(post => 
        post.id === postId
          ? { 
              ...post, 
              comments: post.comments.filter(c => c.id !== commentId) 
            }
          : post
      ));
    } catch {
      setError("Failed to delete comment");
    } finally {
      setLoading(false);
    }
  };

  const editComment = async (postId: string, commentId: string, newText: string) => {
  setLoading(true);
  try {
    const ip = await getUserIP();
    await storage.editComment(postId, commentId, newText, ip);
    setPosts(prev => prev.map(post => 
      post.id === postId ? {
        ...post,
        comments: post.comments.map(c => 
          c.id === commentId ? { ...c, text: newText } : c
        )
      } : post
    ));
  } catch {
    setError("Failed to edit comment");
  } finally {
    setLoading(false);
  }
};

  const boostPost = async (postId: string, tier: BoostTier | null) => {
    setLoading(true);
    try {
      const now = Timestamp.now();
      const updateData = {
        boostTier: tier,
        boostAmount: tier?.amount ?? null,
        boostTime: tier ? now : null,
        currentBoostWeight: tier ? calculateBoostWeight(tier, Date.now()) : null
      };

      await storage.updatePost(postId, updateData);
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              ...updateData,
              boostTime: updateData.boostTime?.toDate() ?? null
            } 
          : post
      ));
    } catch {
      throw new Error("Boost failed");
    } finally {
      setLoading(false);
    }
  };

  const calculateBoostWeight = (tier: BoostTier, boostTime: number): number => {
    const hoursPassed = (Date.now() - boostTime) / 3600000;
    const decayRates = {
      Basic: 0.1,
      "Start+": 0.15,
      Advanced: 0.2,
      Premium: 0.25,
      Elite: 0.3,
      GodMode: 0.4,
    };
    return tier.amount * Math.pow(1 - decayRates[tier.name], hoursPassed);
  };

  const sortPosts = (type: SortType) => {
    setSortType(type);
    
    const sorted = [...filteredPosts].sort((a, b) => {
      const getPositiveVotes = (post: Post) => post.positiveVotesCount || 0;
      const getBoostWeight = (post: Post) => post.currentBoostWeight || 0;
      
      const getDateValue = (post: Post) => {
        if (post.date instanceof Timestamp) return post.date.toMillis();
        if (post.date instanceof Date) return post.date.getTime();
        return new Date(post.date).getTime();
      };
  
      switch (type) {
        case "new":
          return getDateValue(b) - getDateValue(a);
        
        case "top":
          // Сортировка по количеству положительных голосов
          return getPositiveVotes(b) - getPositiveVotes(a);
        
        case "trending": {
          // Комбинированный рейтинг (голоса + буст)
          const scoreA = getPositiveVotes(a) + getBoostWeight(a);
          const scoreB = getPositiveVotes(b) + getBoostWeight(b);
          return scoreB - scoreA;
        }
        
        case "random":
          return Math.random() - 0.5;
        
        default:
          return 0;
      }
    });
    
    setFilteredPosts(sorted);
  };

  const searchPosts = async (query: string) => {
    try {
      const filtered = posts.filter(post => 
        post.shortId.toLowerCase().includes(query.toLowerCase()) ||
        String(post.orderNumber).includes(query) || 
        post.title.toLowerCase().includes(query.toLowerCase()) || 
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        (post.category && post.category.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } catch {
      setFilteredPosts([]);
    }
  };

  const moderatePost = async (postId: string, action: 'approve' | 'reject', note?: string) => {
    setLoading(true);
    try {
      const moderatorId = publicKey ? `wallet:${publicKey.toString()}` : 'moderator-system';
      await storage.moderatePost(postId, action, moderatorId, note);
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              status: action === 'approve' ? 'approved' : 'rejected',
              moderatedBy: moderatorId,
              moderatorNote: note || null
            }
          : post
      ));
    } catch {
      throw new Error("Moderation failed");
    } finally {
      setLoading(false);
    }
  };

  const getPostsForModeration = async (): Promise<Post[]> => {
    setLoading(true);
    try {
      return await storage.getPostsForModeration();
    } catch {
      throw new Error("Failed to fetch posts for moderation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        filteredPosts,
        loading,
        error,
        sortType,
        isAddPostFormVisible,
        addPostFormData,
        setSortType,
        searchPosts,
        addPost,
        isPostAuthor,
        editPost,
        deletePost,
        getPostsByIp,
        getPostsByWallet,
        votePost,
        addComment,
        deleteComment,
        editComment,
        ratePost: (postId) => {
          const ip = localStorage.getItem('userIp') || 'anonymous';
          return votePost(postId, ip, 1); // Автоматически +1 голос
        },
        boostPost,
        sortPosts,
        setFilteredPosts,
        showAddPostForm: () => setIsAddPostFormVisible(true),
        hideAddPostForm: () => setIsAddPostFormVisible(false),
        setAddPostFormData,
        handleAddPostSubmit,
        CATEGORIES,
        moderatePost,
        isModerator,
        getPostsForModeration,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}