// src/utils/staking.ts
interface StakingLevel {
  level: number;
  rewardMultiplier: number;
}

export const STAKING_LEVELS: Record<number, StakingLevel> = {
  10000: { level: 1, rewardMultiplier: 1.1 },
  25000: { level: 2, rewardMultiplier: 1.25 },
  50000: { level: 3, rewardMultiplier: 1.5 },
  100000: { level: 4, rewardMultiplier: 2 },
  200000: { level: 5, rewardMultiplier: 3 },
};

export function calculateStakingRewards(amount: number, duration: number): number {
  const thresholds = Object.keys(STAKING_LEVELS)
    .map(Number)
    .sort((a, b) => b - a);
  
  const levelThreshold = thresholds.find(threshold => amount >= threshold);
  
  if (levelThreshold === undefined) {
    return amount * (duration / 365); // Базовый множитель 1
  }

  const { rewardMultiplier } = STAKING_LEVELS[levelThreshold];
  return amount * rewardMultiplier * (duration / 365);
}