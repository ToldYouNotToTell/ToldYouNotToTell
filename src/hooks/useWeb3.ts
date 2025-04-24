// src/hooks/useWeb3.ts
'use client';

import { useEffect, useState } from 'react';
import { useUniversalStorage } from '@/hooks/useUniversalStorage';  // убедитесь, что путь корректен

declare global {
  interface Window {
    solana?: any;
  }
}

export function useWeb3() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Хук работы с localStorage, возвращает [value, setValue]
  const [storedWallet, setStoredWallet] = useUniversalStorage<string | null>(
    'phantomWallet',
    null
  );

  // При инициализации подхватываем сохранённый кошелёк
  useEffect(() => {
    if (storedWallet) {
      setWalletAddress(storedWallet);
      setIsConnected(true);
    }
  }, [storedWallet]);

  // Функция подключения Phantom
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

  return {
    connectWallet,
    walletAddress,
    isConnected,
  };
}