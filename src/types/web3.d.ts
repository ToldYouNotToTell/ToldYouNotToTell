// src/types/web3.d.ts
import { Transaction } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: {
      isPhantom: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      signTransaction: (tx: Transaction) => Promise<{ serialize: () => Uint8Array }>;
    };
  }
}

export interface Web3ContextType {
  connectWallet: () => Promise<void>;
  walletAddress: string | null;
  isConnected: boolean;
  boostPost: (postId: string | number, amount: number) => Promise<void>;
  sendTransaction?: (walletAddress: string, transaction: Transaction) => Promise<string>;
  getTokenBalance?: (walletAddress: string, tokenMintAddress: string) => Promise<number>;
}