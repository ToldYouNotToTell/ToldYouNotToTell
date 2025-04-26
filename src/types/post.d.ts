// src/types/post.d.ts

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  date: string;
}

export interface Post {
  id: string; // Меняем number на string
  title: string;
  date: string;
  content: string;
  voters: string[];
  comments: Comment[];
  orderNumber: number;
  authorId?: string;
  authorWallet?: string;
  category?: string;
  boostAmount?: number;
  boostTime?: number;
  currentBoostWeight?: number;
  boostTier?: BoostTier | null;
  moderatedBy?: string;
  moderatorNote?: string;
  recoveryCode?: string;
}

export interface BoostTier {
  id: number;
  name: 'Basic' | 'Start+' | 'Advanced' | 'Premium' | 'Elite' | 'Sponsor';
  amount: number;
  color: string;
}