// src/contexts/Web3Context.tsx
'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useMemo, useCallback } from 'react';
import { useUniversalStorage } from '@/hooks/useUniversalStorage';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Web3ContextValue, Web3ProviderProps } from '@/types/web3';

const Web3Context = createContext<Web3ContextValue | null>(null);

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  const [storedWallet, setStoredWallet] = useUniversalStorage<string | null>(
    'phantomWallet',
    null
  );

  const connection = useMemo(() => new Connection(
    process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.devnet.solana.com'
  ), []);

  // Проверка установки Phantom и подписка на события
  useEffect(() => {
    const checkPhantom = () => {
      setIsPhantomInstalled(!!window.solana?.isPhantom);
    };

    checkPhantom();
    window.addEventListener('load', checkPhantom);

    return () => {
      window.removeEventListener('load', checkPhantom);
    };
  }, []);

  // Восстановление кошелька из хранилища
  useEffect(() => {
    if (storedWallet) {
      setWalletAddress(storedWallet);
      setIsConnected(true);
    }
  }, [storedWallet]);

  // Обработчик изменения аккаунта
  useEffect(() => {
    const handleAccountChange = (publicKey: PublicKey | null) => {
      const address = publicKey?.toString() || null;
      setWalletAddress(address);
      setIsConnected(!!address);
      setStoredWallet(address);
    };

    window.solana?.on('accountChanged', handleAccountChange);
    return () => {
      window.solana?.off('accountChanged', handleAccountChange);
    };
  }, [setStoredWallet]);

  const connectWallet = useCallback(async (): Promise<string> => {
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
      return publicKey;
    } catch (error) {
      console.error('Connection error:', error);
      throw new Error('Failed to connect wallet');
    }
  }, [setStoredWallet]);

  const disconnectWallet = useCallback(async (): Promise<void> => {
    try {
      await window.solana?.disconnect();
    } catch (error) {
      console.error('Disconnection error:', error);
    } finally {
      setWalletAddress(null);
      setIsConnected(false);
      setStoredWallet(null);
    }
  }, [setStoredWallet]);

  const sendTransaction = useCallback(async (tx: Transaction): Promise<string> => {
    if (!window.solana || !walletAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      tx.feePayer = new PublicKey(walletAddress);
      const { blockhash } = await connection.getRecentBlockhash();
      tx.recentBlockhash = blockhash;

      const signedTx = await window.solana.signTransaction(tx);
      const signature = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }, [connection, walletAddress]);

  const boostPost = useCallback(async (postId: string, amount: number): Promise<string> => {
    if (!walletAddress) throw new Error('Wallet not connected');
  
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(walletAddress),
        toPubkey: new PublicKey(process.env.NEXT_PUBLIC_TREASURY_WALLET || '11111111111111111111111111111111'),
        lamports: Math.floor(amount * 1e9),
      })
    );
  
    return sendTransaction(tx);
  }, [walletAddress, sendTransaction]);

  // Мемоизированное значение контекста
  const contextValue = useMemo<Web3ContextValue>(() => ({
    connectWallet,
    disconnectWallet,
    walletAddress,
    isConnected,
    isPhantomInstalled,
    boostPost,
    sendTransaction,
    connection
  }), [
    connectWallet,
    disconnectWallet,
    walletAddress,
    isConnected,
    isPhantomInstalled,
    boostPost,
    sendTransaction,
    connection
  ]);

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextValue => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};