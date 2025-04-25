// src/hooks/useWeb3.ts
'use client';

import { useState, useEffect } from 'react';
import { useUniversalStorage } from '@/hooks/useUniversalStorage';

declare global {
  interface Window {
    solana?: any;
  }
}

export function useWeb3() {
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
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  const boostPost = async (postId: number, amount: number) => {
    if (!walletAddress) {
      throw new Error('Wallet not connected');
    }
    // Здесь будет реальная логика вызова контракта
    console.log(`Boosting post ${postId} with ${amount} USDT`);
    return Promise.resolve();
  };

  return {
    connectWallet,
    walletAddress,
    isConnected,
    boostPost
  };
}