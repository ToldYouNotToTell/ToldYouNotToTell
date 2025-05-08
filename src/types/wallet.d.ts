// src/types/wallet.ts
import { PublicKey } from "@solana/web3.js";

export interface WalletActions {
  isConnected: boolean;
  address: string | null;
  shortAddress: string | null;
  publicKey: PublicKey | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
