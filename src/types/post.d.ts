// src/types/post.d.ts
import { BoostTier } from './web3';

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  date: string;
}

export interface Post {
  id: string;
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