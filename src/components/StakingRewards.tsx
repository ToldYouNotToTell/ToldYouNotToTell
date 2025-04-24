// src/components/ui/cards/StakingRewards.tsx
'use client';

import React, { FC, useMemo } from 'react';
import ClockIcon from '@/components/ui/icons/ClockIcon';

interface StakingRewardsProps {
  /** Сумма застейканных пользователем токенов TYNTT */
  stakeAmount: number;
  /** Общая сумма застейканных токенов в пуле */
  totalStaked: number;
  /** Ежедневный объём токенов, поступающий в пул (10% от налогов) */
  dailyPoolAmount: number;
  /** Коллбэк для кнопки “Stake” */
  onStake: () => void;
  /** Коллбэк для кнопки “Unstake” */
  onUnstake: () => void;
}

/** Соответствие суммы стейка → числа постов в Trending */
const STAKING_TIERS: Array<[threshold: number, posts: number]> = [
  [200_000, 5],
  [100_000, 4],
  [50_000, 3],
  [25_000, 2],
  [10_000, 1],
];

const StakingRewards: FC<StakingRewardsProps> = ({
  stakeAmount,
  totalStaked,
  dailyPoolAmount,
  onStake,
  onUnstake,
}) => {
  // Доля пользователя в пуле
  const userShare = totalStaked > 0 ? stakeAmount / totalStaked : 0;

  // Ежедневное вознаграждение пользователя
  const dailyReward = dailyPoolAmount * userShare;

  // Годовое вознаграждение и APY
  const annualReward = dailyReward * 365;
  const apy = stakeAmount > 0 ? (annualReward / stakeAmount) * 100 : 0;

  // Сколько постов в Trending по текущему стейку
  const trendingPosts = useMemo(() => {
    for (const [threshold, posts] of STAKING_TIERS) {
      if (stakeAmount >= threshold) return posts;
    }
    return 0;
  }, [stakeAmount]);

  return (
    <div className="staking-page">
      <h1>Staking Dashboard</h1>

      <div className="staking-section" style={{ marginBottom: 20 }}>
        <h3>
          <ClockIcon size={14} style={{ marginRight: 4 }} />
          Daily Rewards
        </h3>
        <p>{dailyReward.toFixed(2)} TNTT / day</p>
      </div>

      <div className="staking-section" style={{ marginBottom: 20 }}>
        <h3>Current APY</h3>
        <p>{apy.toFixed(2)} %</p>
      </div>

      <div className="staking-section" style={{ marginBottom: 20 }}>
        <h3>Your Stake</h3>
        <p>{stakeAmount.toLocaleString()} TYNTT</p>
        <div style={{ marginTop: 10 }}>
          <button onClick={onStake} style={{ marginRight: 8 }}>
            Stake
          </button>
          <button onClick={onUnstake}>
            Unstake
          </button>
        </div>
      </div>

      <div className="staking-section">
        <h3>Trending Exposure</h3>
        {trendingPosts > 0 ? (
          <p>
            You will see <strong>{trendingPosts}</strong> posts in Trending
          </p>
        ) : (
          <p>Stake at least 10 000 TYNTT to get Trending exposure</p>
        )}
      </div>
    </div>
  );
};

export default StakingRewards;