'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useUniversalStorage } from '@/hooks/useUniversalStorage';
import { toast } from 'sonner';

type Web3ContextType = {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  walletAddress: string | null;
  isConnected: boolean;
  stakeTokens: (amount: number) => Promise<string>;
  boostPost: (postId: string, amount: number) => Promise<string>;
  claimRewards: () => Promise<number>;
  participateLottery: () => Promise<string>;
  stakeTier: number;
  stakedAmount: number;
  refreshBalance: () => Promise<void>;
};

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [stakeTier, setStakeTier] = useState(0);
  const [connection] = useState(new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC!));
  const [phantom, setPhantom] = useState<any>(null);
  const [phantomWallet, setPhantomWallet] = useUniversalStorage<string | null>('phantomWallet', null);

  // Инициализация Phantom
  useEffect(() => {
    const initPhantom = () => {
      if (window.solana?.isPhantom) {
        setPhantom(window.solana);
        if (phantomWallet) {
          connectWallet().catch(console.error);
        }
      }
    };

    if (document.readyState !== 'complete') {
      window.addEventListener('load', initPhantom);
      return () => window.removeEventListener('load', initPhantom);
    } else {
      initPhantom();
    }
  }, [phantomWallet]);

  const connectWallet = useCallback(async () => {
    if (!phantom) {
      window.open('https://phantom.app/', '_blank');
      throw new Error('Phantom wallet not detected');
    }

    try {
      const response = await phantom.connect();
      const address = response.publicKey.toString();
      setWalletAddress(address);
      setIsConnected(true);
      setPhantomWallet(address);
      await refreshBalance();
      toast.success('Wallet connected successfully');
      return address;
    } catch (error) {
      toast.error('Failed to connect wallet');
      throw error;
    }
  }, [phantom, setPhantomWallet]);

  const disconnectWallet = useCallback(() => {
    if (phantom?.isConnected) {
      phantom.disconnect().catch(console.error);
    }
    setWalletAddress(null);
    setIsConnected(false);
    setPhantomWallet(null);
    setStakedAmount(0);
    setStakeTier(0);
    toast.info('Wallet disconnected');
  }, [phantom, setPhantomWallet]);

  const refreshBalance = useCallback(async () => {
    if (!walletAddress) return;

    try {
      // Получаем баланс стейкинга из программы
      const stakeAccount = await getStakeAccount(new PublicKey(walletAddress));
      setStakedAmount(stakeAccount.amount);
      setStakeTier(calculateStakeTier(stakeAccount.amount));
    } catch (error) {
      console.error('Error fetching stake balance:', error);
    }
  }, [walletAddress]);

  const stakeTokens = useCallback(async (amount: number) => {
    if (!walletAddress || !phantom) throw new Error('Wallet not connected');

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(process.env.NEXT_PUBLIC_STAKING_PROGRAM!),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { signature } = await phantom.signAndSendTransaction(transaction);
      await refreshBalance();
      toast.success(`${amount} TNTT staked successfully`);
      return signature;
    } catch (error) {
      toast.error('Failed to stake tokens');
      throw error;
    }
  }, [walletAddress, phantom, refreshBalance]);

  const boostPost = useCallback(async (postId: string, amount: number) => {
    if (!walletAddress || !phantom) throw new Error('Wallet not connected');

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(process.env.NEXT_PUBLIC_BOOST_PROGRAM!),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { signature } = await phantom.signAndSendTransaction(transaction);
      
      // Обновляем пост в Firestore
      await fetch('/api/boost-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          postId, 
          amount, 
          txId: signature,
          walletAddress 
        }),
      });

      toast.success(`Post boosted with ${amount} USDT`);
      return signature;
    } catch (error) {
      toast.error('Failed to boost post');
      throw error;
    }
  }, [walletAddress, phantom]);

  const claimRewards = useCallback(async () => {
    if (!walletAddress || !phantom) throw new Error('Wallet not connected');

    try {
      const response = await fetch(`/api/claim-rewards?wallet=${walletAddress}`);
      const { amount } = await response.json();

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(process.env.NEXT_PUBLIC_REWARDS_POOL!),
          toPubkey: new PublicKey(walletAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { signature } = await phantom.signAndSendTransaction(transaction);
      toast.success(`Claimed ${amount} TNTT rewards`);
      return amount;
    } catch (error) {
      toast.error('Failed to claim rewards');
      throw error;
    }
  }, [walletAddress, phantom]);

  const startAnonymousSession = async () => {
    try {
      const { user } = await signInAnonymously(auth);
      await setDoc(doc(db, 'anonymousSessions', user.uid), {
        ip: await fetchClientIP(),
        createdAt: serverTimestamp()
      });
      return user.uid;
    } catch (error) {
      console.error('Anonymous auth failed:', error);
      return null;
    }
  };

  const participateLottery = useCallback(async () => {
    if (!walletAddress || !phantom) throw new Error('Wallet not connected');

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(process.env.NEXT_PUBLIC_LOTTERY_POOL!),
          lamports: 0.1 * LAMPORTS_PER_SOL, // Входной билет 0.1 SOL
        })
      );

      const { signature } = await phantom.signAndSendTransaction(transaction);
      
      await fetch('/api/participate-lottery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          walletAddress,
          txId: signature 
        }),
      });

      toast.success('Successfully entered the lottery');
      return signature;
    } catch (error) {
      toast.error('Failed to participate in lottery');
      throw error;
    }
  }, [walletAddress, phantom]);

  // Периодическое обновление баланса
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      refreshBalance().catch(console.error);
    }, 30000); // Каждые 30 секунд

    return () => clearInterval(interval);
  }, [isConnected, refreshBalance]);

  return (
    <Web3Context.Provider value={{
      connectWallet,
      disconnectWallet,
      walletAddress,
      isConnected,
      stakeTokens,
      boostPost,
      claimRewards,
      participateLottery,
      stakeTier,
      stakedAmount,
      refreshBalance
      startAnonymousSession,
      isAnonymous: !!auth.currentUser?.isAnonymous
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

// Вспомогательные функции
async function getStakeAccount(publicKey: PublicKey) {
  // Реальная реализация будет зависеть от вашей программы стейкинга
  return {
    amount: 0, // Замените реальным запросом к программе
    stakedAt: new Date()
  };
}

function calculateStakeTier(amount: number): number {
  if (amount >= 100000) return 3;
  if (amount >= 50000) return 2;
  if (amount >= 10000) return 1;
  return 0;
}