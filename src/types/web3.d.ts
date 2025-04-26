// src/types/web3.d.ts
import { Transaction, Connection, PublicKey } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: {
      isPhantom: boolean;
      connect: () => Promise<{ publicKey: PublicKey }>;
      disconnect: () => Promise<void>;
      signTransaction: (tx: Transaction) => Promise<Transaction>;
      on: (event: string, callback: (args: any) => void) => void;
      off: (event: string, callback: (args: any) => void) => void;
    };
  }
}

export type BoostTier = {
  id: number;
  name: 'Basic' | 'Start+' | 'Advanced' | 'Premium' | 'Elite' | 'Sponsor';
  amount: number;
  color: string;
};

export type WalletResponse = {
  publicKey: string;
  error?: never;
} | {
  publicKey?: never;
  error: string;
};

export type TransactionResponse = {
  txId: string;
  error?: never;
} | {
  txId?: never;
  error: string;
};

export interface Web3ContextValue {
  connectWallet: () => Promise<string>;
  disconnectWallet: () => Promise<void>;
  walletAddress: string | null;
  isConnected: boolean;
  isPhantomInstalled: boolean;
  boostPost: (postId: string, amount: number) => Promise<string>;
  sendTransaction: (tx: Transaction) => Promise<string>;
  connection: Connection;
}

export interface Web3ProviderProps {
  children: React.ReactNode;
}