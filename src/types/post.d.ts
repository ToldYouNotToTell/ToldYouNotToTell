// src/types/post.d.ts
import { Timestamp } from "firebase/firestore";

export type BoostTier = {
  id: number;
  name: "Basic" | "Start+" | "Advanced" | "Premium" | "Elite" | "GodMode";
  amount: number;
  color: string;
  emoji: "🌱" | "🐻" | "🐰" | "🐬" | "💎" | "👑";
  duration?: number; 
};

export type SortType = "new" | "top" | "trending" | "random";

export interface Comment {
  id: string;
  text: string;
  authorIp?: string | null; 
  date: string;
}

export interface Post {
  id: string;
  shortId: string;
  date: Timestamp | Date | string;
  title: string;
  content: string;
  category?: string;
  votes: Record<string, number>; // { [userIpOrWallet]: voteValue (1/-1) }
  positiveVotesCount: number;
  comments: Comment[];
  orderNumber: number;
  authorIp?: string | null;
  authorWallet?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  moderatedBy?: string | null;
  moderatorNote?: string | null;
  boostTier?: BoostTier | null;
  boostAmount?: number | null;
  boostTime?: Timestamp | Date | string | null;
  currentBoostWeight?: number | null;
}

export interface RatingData {
  postId: string;
  voterWallet: string;
  value: number; // 1-5
  timestamp: number;
}

export interface PostsContextType {
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (post: {
    title: string;
    content: string;
    category?: string;
    authorWallet?: string;
  }) => Promise<Post>;
  editPost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  votePost: (postId: string, userId: string) => Promise<void>;
  addComment: (postId: string, text: string, userId: string) => Promise<void>;
  deleteComment: (postId: string, commentId: string) => Promise<void>;
  editComment: (
    postId: string,
    commentId: string,
    newText: string,
  ) => Promise<void>;
  ratePost: (
    postId: string,
    voterWallet: string,
    value: number,
  ) => Promise<void>;
  getUserRatings: (wallet: string) => RatingData[];
}

export interface VoteData {
  postId: string;
  voterId: string; // "anon-[randomHash]" или walletAddress
  timestamp: number;
}

export interface PostCardProps {
  post: Post;
  currentUserId?: string;
  isAuthor: boolean;
  isModerator?: boolean;
  isTrending?: boolean;
  isLoading?: boolean;
  commentsCount?: number;
  onEdit?: (updates: Partial<Post>) => void;
  onDelete?: () => void;
  onVote?: () => void;
  onComment?: (text: string) => Promise<void> | void;
  onCommentDelete?: (commentId: string) => Promise<void> | void;
  onCommentEdit?: (commentId: string, newText: string) => Promise<void> | void;
}

export interface CommentProps {
  comment: Comment;
  currentUserId?: string;
  onDelete?: () => void;
  onEdit?: (newText: string) => Promise<void> | void;
}

export interface PostListProps {
  posts: Post[];
  currentUserId?: string;
  onEdit?: (id: string, updates: Partial<Post>) => void;
  onDelete?: (id: string) => void;
  onVote?: (id: string) => void;
  onComment?: (postId: string) => (text: string) => Promise<void>;
  onCommentDelete?: (postId: string, commentId: string) => void;
  onCommentEdit?: (postId: string, commentId: string, newText: string) => void;
}
