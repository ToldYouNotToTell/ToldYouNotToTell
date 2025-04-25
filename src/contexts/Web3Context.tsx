// src/contexts/Web3Context.tsx
'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useUniversalStorage } from '@/hooks/useUniversalStorage';

interface Web3ContextValue {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  walletAddress: string | null;
  isConnected: boolean;
}

const Web3Context = createContext<Web3ContextValue | null>(null);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [storedWallet, setStoredWallet] = useUniversalStorage<string | null>(
    'phantomWallet',
    null
  );

  // Восстановление сессии при загрузке
  useEffect(() => {
    if (storedWallet) {
      setWalletAddress(storedWallet);
      setIsConnected(true);
    }
  }, [storedWallet]);

  // Подключение Phantom
  const connectWallet = async () => {
    if (!window.solana?.isPhantom) {
      window.open('https://phantom.app/', '_blank');
      throw new Error('Phantom wallet not installed');
    }

    try {
      const response = await window.solana.connect();
      const publicKey = response.publicKey.toString();
      setWalletAddress(publicKey);
      setIsConnected(true);
      setStoredWallet(publicKey);
    } catch (error) {
      console.error('Connection error:', error);
      throw new Error('Failed to connect wallet');
    }
  };

  // Отключение Phantom
  const disconnectWallet = () => {
    if (window.solana?.disconnect) {
      window.solana.disconnect().catch(console.error);
    }
    setWalletAddress(null);
    setIsConnected(false);
    setStoredWallet(null);
  };

  const value: Web3ContextValue = {
    connectWallet,
    disconnectWallet,
    walletAddress,
    isConnected,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};