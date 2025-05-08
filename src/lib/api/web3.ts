// src/lib/api/web3.ts
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

import type { PhantomProvider } from "@/types/global";

const connection = new Connection(clusterApiUrl("mainnet-beta"));

export async function sendTransaction(
  walletAddress: string,
  transaction: Transaction,
): Promise<string> {
  try {
    const provider = window.solana as PhantomProvider;
    if (!provider || typeof provider.signTransaction !== "function") {
      throw new Error(
        "Phantom провайдер не найден или не поддерживает signTransaction",
      );
    }

    const publicKey = new PublicKey(walletAddress);
    const { blockhash } = await connection.getLatestBlockhash();

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;

    const signedTx = await provider.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTx.serialize());
    return txid;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}