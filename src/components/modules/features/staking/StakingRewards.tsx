// src/components/ui/cards/StakingRewards.tsx
'use client';

import React from 'react';
import ClockIcon from '@/components/ui/icons/ClockIcon';
import { useWeb3 } from '@/hooks/useWeb3';

interface StakingRewardsProps {
  stakeAmount: number;
  totalStaked: number;
  dailyPoolAmount: number;
}

export default function StakingRewards({
  stakeAmount,
  totalStaked,
  dailyPoolAmount
}: StakingRewardsProps) {
  const { isConnected } = useWeb3();

  const userShare = totalStaked > 0 ? stakeAmount / totalStaked : 0;
  const dailyReward = dailyPoolAmount * userShare;
  const apy = stakeAmount > 0 ? (dailyReward * 365 / stakeAmount) * 100 : 0;

  if (!isConnected) {
    return (
      <div className="card p-6">
        <h2>Connect Phantom Wallet to view staking rewards</h2>
      </div>
    );
  }

  return (
    <div className="card p-6">
      {/* ... (остальной JSX остаётся таким же) ... */}
    </div>
  );
}