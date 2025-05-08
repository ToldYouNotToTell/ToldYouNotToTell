// src/types/global.d.ts
import { PublicKey, Transaction } from "@solana/web3.js";

type PhantomEvent = "connect" | "disconnect" | "accountChanged";

type PhantomEventHandlers = {
  connect: (publicKey: PublicKey) => void;
  disconnect: () => void;
  accountChanged: (publicKey: PublicKey | null) => void;
};

interface PhantomProvider {
  isPhantom?: boolean;
  publicKey?: PublicKey;
  connect: (options?: {
    onlyIfTrusted?: boolean;
  }) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  on: (event: string, handler: (args: unknown) => void) => void;
  off: (event: string, handler: (args: unknown) => void) => void;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
    solflare?: {
      isSolflare?: boolean;
      connect?: () => Promise<void>;
    };
  }
}
