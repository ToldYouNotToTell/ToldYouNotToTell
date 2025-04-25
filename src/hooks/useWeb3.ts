// src/contexts/Web3Context.tsx
'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useUniversalStorage } from '@/hooks/useUniversalStorage';
import { sendTransaction, getTokenBalance, boostPost as apiBoostPost } from '@/lib/api/web3';
import { Transaction } from '@solana/web3.js';

interface Web3ContextType {
  connectWallet: () => Promise<void>;
  walletAddress: string | null;
  isConnected: boolean;
  boostPost: (postId: string | number, amount: number) => Promise<void>;
  sendTransaction?: (tx: Transaction) => Promise<string>;
  getTokenBalance?: (tokenMint: string) => Promise<number>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [storedWallet, setStoredWallet] = useUniversalStorage<string | null>(
    'phantomWallet',
    null
  );

  useEffect(() => {
    if (storedWallet) {
      setWalletAddress(storedWallet);
      setIsConnected(true);
    }
  }, [storedWallet]);

  const connectWallet = async () => {
    if (window.solana?.isPhantom) {
      try {
        const resp = await window.solana.connect();
        const pubkey = resp.publicKey.toString();
        setWalletAddress(pubkey);
        setIsConnected(true);
        setStoredWallet(pubkey);
      } catch (err) {
        console.error('Phantom connection error', err);
        throw new Error('Failed to connect wallet');
      }
    } else {
      window.open('https://phantom.app/', '_blank');
      throw new Error('Phantom wallet not installed');
    }
  };

  const boostPost = async (postId: string | number, amount: number) => {
    if (!walletAddress) throw new Error('Wallet not connected');
    return apiBoostPost(walletAddress, postId, amount);
  };

  const contextValue: Web3ContextType = {
    connectWallet,
    walletAddress,
    isConnected,
    boostPost,
    sendTransaction: walletAddress 
      ? (tx: Transaction) => sendTransaction(walletAddress, tx)
      : undefined,
    getTokenBalance: walletAddress
      ? (tokenMint: string) => getTokenBalance(walletAddress, tokenMint)
      : undefined
  };

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
}