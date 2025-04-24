// src/types/post.d.ts

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  date: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  voters: string[];
  date: string;
  comments: Comment[];
  orderNumber: number;
  authorId?: string;
  authorWallet?: string;
  category?: string;
  boostAmount?: number;
  boostTime?: number;
  currentBoostWeight?: number;
  moderatedBy?: string;
  moderatorNote?: string;
  recoveryCode?: string;
}