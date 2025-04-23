interface Post {
    id: number;
    title: string;
    content: string;
    category?: string;
    voters: string[];
    date: Date;
    comments: Comment[];
    orderNumber: number;
    authorIP?: string;
    authorWallet?: string;
    boostAmount?: number;
    boostTime?: number;
    currentBoostWeight?: number;
  }
  
  interface Comment {
    id: number;
    text: string;
  }