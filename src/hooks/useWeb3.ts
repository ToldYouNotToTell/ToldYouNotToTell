'use client';

import { useState, useEffect } from 'react';

export function useWeb3() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
        setWalletConnected(true);
        setValue('phantomWallet', response.publicKey.toString());
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    const savedWallet = useUniversalStorage('phantomWallet');
    if (savedWallet) {
      setWalletAddress(savedWallet);
      setWalletConnected(true);
    }
  }, []);

  return {
    walletConnected,
    walletAddress,
    connectWallet
  };
}