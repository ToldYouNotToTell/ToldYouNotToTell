// src/lib/api/web3.ts
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: {
      isPhantom: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      signTransaction: (tx: Transaction) => Promise<{ serialize: () => Uint8Array }>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: (args: any) => void) => void;
      off: (event: string, callback: (args: any) => void) => void;
    };
  }
}

const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC_URL);

export async function sendTransaction(
  walletAddress: string,
  transaction: Transaction
): Promise<string> {
  try {
    if (!window.solana?.signTransaction) {
      throw new Error("Phantom wallet signTransaction method not available");
    }

    const publicKey = new PublicKey(walletAddress);
    const latestBlockhash = await connection.getLatestBlockhash();
    
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = publicKey;

    const signedTx = await window.solana.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTx.serialize());

    return txId;
  } catch (error) {
    console.error("Transaction error:", error);
    throw new Error("Failed to send transaction");
  }
}

export async function getTokenBalance(
  walletAddress: string,
  tokenMintAddress: string
): Promise<number> {
  try {
    // Реализация проверки баланса токенов
    return 0; // Заглушка
  } catch (error) {
    console.error("Balance check error:", error);
    throw new Error("Failed to get token balance");
  }
}

export async function boostPost(
  walletAddress: string,
  postId: string | number,
  amount: number
): Promise<void> {
  const numericId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
  
  if (!walletAddress) {
    throw new Error("Wallet not connected");
  }

  if (isNaN(numericId)) {
    throw new Error("Invalid post ID");
  }

  console.log(`Boosting post ${numericId} with ${amount} USDT from ${walletAddress}`);
  // Реальная логика вызова контракта
}