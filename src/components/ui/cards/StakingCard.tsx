// src/components/ui/cards/StakingCard.tsx
"use client";

import React, { FC, useMemo } from "react";

import ClockIcon from "@/components/ui/icons/ClockIcon";

export interface StakingCardProps {
  /** Сумма застейканных пользователем токенов */
  stakeAmount: number;
  /** Общая сумма токенов в пуле */
  totalStaked: number;
  /** Ежедневное пополнение пула (10% от налогов) */
  dailyPoolAmount: number;
  /** Функция при нажатии Stake */
  onStake: () => void;
  /** Функция при нажатии Unstake */
  onUnstake: () => void;
}

/** Правила выдачи Trending-постов по сумме стейка */
const STAKING_TIERS: Array<[threshold: number, posts: number]> = [
  [200_000, 5],
  [100_000, 4],
  [50_000, 3],
  [25_000, 2],
  [10_000, 1],
];

const StakingCard: FC<StakingCardProps> = ({
  stakeAmount,
  totalStaked,
  dailyPoolAmount,
  onStake,
  onUnstake,
}) => {
  // Доля пользователя в общем пуле
  const share = totalStaked > 0 ? stakeAmount / totalStaked : 0;

  // Ежедневные награды пользователя
  const dailyReward = dailyPoolAmount * share;

  // Ежегодный доход и APY
  const annualReward = dailyReward * 365;
  const apy = stakeAmount > 0 ? (annualReward / stakeAmount) * 100 : 0;

  // Вычисляем, сколько постов попадет в Trending
  const trendingCount = useMemo(() => {
    for (const [threshold, posts] of STAKING_TIERS) {
      if (stakeAmount >= threshold) return posts;
    }
    return 0;
  }, [stakeAmount]);

  return (
    <div className="staking-page">
      <h1>Stake TYNT Tokens</h1>

      <div className="staking-section">
        <h3>
          <ClockIcon size={14} className="mr-1" />
          Daily Reward
        </h3>
        <p>{dailyReward.toFixed(2)} TYNT / day</p>
      </div>

      <div className="staking-section">
        <h3>Current APY</h3>
        <p>{apy.toFixed(2)}%</p>
      </div>

      <div className="staking-section">
        <h3>Your Stake</h3>
        <p>{stakeAmount.toLocaleString()} TYNT</p>
        <div className="form-actions" style={{ marginTop: 10 }}>
          <button className="stake-btn" onClick={onStake}>
            Stake
          </button>
          <button className="stake-btn" onClick={onUnstake}>
            Unstake
          </button>
        </div>
      </div>

      <div className="staking-section">
        <h3>Trending Exposure</h3>
        {trendingCount > 0 ? (
          <p>
            You&apos;ll see <strong>{trendingCount}</strong> post
            {trendingCount > 1 && "s"} in Trending
          </p>
        ) : (
          <p>Stake at least 10 000 TYNT to get Trending exposure</p>
        )}
      </div>
    </div>
  );
};

export default StakingCard;
