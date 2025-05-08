// src/types/solana.d.ts
import { PublicKey, Transaction } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: {
      isPhantom: boolean;
      publicKey?: PublicKey;
      connect: () => Promise<{ publicKey: PublicKey }>;
      signTransaction: (tx: Transaction) => Promise<Transaction>;
      signAllTransactions?: (txs: Transaction[]) => Promise<Transaction[]>;
      disconnect: () => Promise<void>;
    };
  }
}
