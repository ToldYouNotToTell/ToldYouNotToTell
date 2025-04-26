// src/lib/api/web3.ts
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

declare global {
  interface Window {
    solana?: {
      isPhantom: boolean;
      connect: () => Promise<{ publicKey: PublicKey }>; // Исправлен тип publicKey
      signTransaction: (tx: Transaction) => Promise<Transaction>; // Возвращает Transaction
      disconnect: () => Promise<void>;
      on: (event: string, callback: (args: any) => void) => void;
      off: (event: string, callback: (args: any) => void) => void;
    };
  }
}

// Остальной код остается без изменений
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
    const txId = await connection.sendRawTransaction(signedTx.serialize()); // serialize() доступен у Transaction

    return txId;
  } catch (error) {
    console.error("Transaction error:", error);
    throw new Error("Failed to send transaction");
  }
}

// ... остальные функции без изменений