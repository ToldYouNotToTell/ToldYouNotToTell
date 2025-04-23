'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

type StakingContextType = {
  stakedAmount: number;
  stakingTier: number;
  trendingPosts: number;
  stakeTokens: (amount: number) => Promise<void>;
  unstakeTokens: (amount: number) => Promise<void>;
};

const StakingContext = createContext<StakingContextType>({
  stakedAmount: 0,
  stakingTier: 0,
  trendingPosts: 0,
  stakeTokens: async () => {},
  unstakeTokens: async () => {}
});

export function StakingProvider({ children }: { children: React.ReactNode }) {
  const { walletAddress } = useWeb3();
  const [state, setState] = useState<Omit<StakingContextType, 'stakeTokens' | 'unstakeTokens'>>({
    stakedAmount: 0,
    stakingTier: 0,
    trendingPosts: 0
  });

  useEffect(() => {
    if (!walletAddress) return;

    const unsubscribe = onSnapshot(doc(db, 'staking', walletAddress), (doc) => {
      const data = doc.data();
      const amount = data?.amount || 0;
      
      setState({
        stakedAmount: amount,
        stakingTier: calculateStakingTier(amount),
        trendingPosts: calculateTrendingPosts(amount)
      });
    });

    return () => unsubscribe();
  }, [walletAddress]);

  const stakeTokens = async (amount: number) => {
    // Implement staking logic
  };

  const unstakeTokens = async (amount: number) => {
    // Implement unstaking logic
  };

  return (
    <StakingContext.Provider value={{ ...state, stakeTokens, unstakeTokens }}>
      {children}
    </StakingContext.Provider>
  );
}

function calculateStakingTier(amount: number): number {
  if (amount >= 200000) return 5;
  if (amount >= 100000) return 4;
  if (amount >= 50000) return 3;
  if (amount >= 25000) return 2;
  if (amount >= 10000) return 1;
  return 0;
}

function calculateTrendingPosts(amount: number): number {
  if (amount >= 200000) return 5;
  if (amount >= 100000) return 4;
  if (amount >= 50000) return 3;
  if (amount >= 25000) return 2;
  if (amount >= 10000) return 1;
  return 0;
}

export const useStaking = () => useContext(StakingContext);