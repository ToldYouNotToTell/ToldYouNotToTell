import { Connection, PublicKey, Transaction } from "@solana/web3.js";

const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC_URL);

export async function sendTransaction(
  walletAddress: string,
  transaction: Transaction
) {
  try {
    const publicKey = new PublicKey(walletAddress);
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = publicKey;

    // В реальном приложении подпись через Phantom Wallet
    const signedTx = await window.solana.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTx.serialize());

    return txId;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
}

export async function getTokenBalance(
  walletAddress: string,
  tokenMintAddress: string
) {
  // Реализация проверки баланса токенов
}
