// src/lib/uiActions.ts
'use client';

import { 
  fetchPosts,
  createPost,
  updatePost,
  deletePostById,
  addComment 
} from '@/lib/api/posts';

import { 
  showTooltip, 
  showError 
} from '@/lib/utils/notifications';

import { 
  moderateText, 
  containsBannedWords 
} from '@/lib/utils/moderation';

import { 
  generateRecoveryCode,
  formatDate,
  escapeHtml,
  copyToClipboard
} from '@/lib/utils/helpers';

import type { BoostTier } from '@/types/post';

type WalletResponse = {
  publicKey: string;
  error?: never;
} | {
  publicKey?: never;
  error: string;
};

type TransactionResponse = {
  txId: string;
  error?: never;
} | {
  txId?: never;
  error: string;
};

async function connectPhantom(): Promise<WalletResponse> {
  try {
    if (!window.solana?.isPhantom) {
      window.open("https://phantom.app/", "_blank");
      return { error: "Phantom not installed" };
    }

    const response = await window.solana.connect();
    const publicKey = response.publicKey.toString();
    
    localStorage.setItem("phantomWallet", publicKey);
    showTooltip(`Connected: ${publicKey.substring(0, 4)}...${publicKey.slice(-4)}`);
    
    return { publicKey };
  } catch (error) {
    console.error("Connection error:", error);
    return { error: "Failed to connect" };
  }
}

async function boostPost(postId: string, tier: BoostTier): Promise<TransactionResponse> {
  try {
    const wallet = localStorage.getItem("phantomWallet");
    if (!wallet) {
      showTooltip("Connect wallet first");
      return { error: "Wallet not connected" };
    }

    const mockTxId = "tx_" + Math.random().toString(36).substring(2, 9);
    showTooltip(`Post ${postId} boosted to ${tier.name} tier!`);
    
    return { txId: mockTxId };
  } catch (error) {
    console.error("Boost error:", error);
    return { error: "Boost failed" };
  }
}

export const uiActions = {
  posts: {
    fetch: fetchPosts,
    create: async (postData: { 
      title: string; 
      content: string; 
      category?: string;
      boostTier?: BoostTier | null 
    }) => {
      const newPost = {
        title: moderateText(postData.title),
        content: moderateText(postData.content),
        date: new Date().toISOString(),
        voters: [],
        comments: [],
        orderNumber: 0,
        category: postData.category,
        boostTier: postData.boostTier ?? null
      };
      
      const result = await createPost(newPost);
      
      if (result) {
        showTooltip("Post created successfully");
      }
      return result;
    },
    update: updatePost,
    delete: deletePostById,
    boost: boostPost,
    addComment
  },
  wallet: {
    connectPhantom,
    disconnect: () => {
      localStorage.removeItem("phantomWallet");
      showTooltip("Wallet disconnected");
    }
  },
  modals: {
    showPresaleModal: () => {
      const modal = document.getElementById('presaleModal');
      if (modal) modal.style.display = 'block';
    },
    hidePresaleModal: () => {
      const modal = document.getElementById('presaleModal');
      if (modal) modal.style.display = 'none';
    }
  },
  utils: {
    copyToClipboard,
    formatDate,
    generateRecoveryCode
  }
} as const;