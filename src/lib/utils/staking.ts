export const STAKING_LEVELS = {
    10000: { level: 1, rewardMultiplier: 1.1 },
    25000: { level: 2, rewardMultiplier: 1.25 },
    50000: { level: 3, rewardMultiplier: 1.5 },
    100000: { level: 4, rewardMultiplier: 2 },
    200000: { level: 5, rewardMultiplier: 3 }
  };
  
  export function calculateStakingRewards(amount: number, duration: number) {
    const level = Object.keys(STAKING_LEVELS)
      .reverse()
      .find(threshold => amount >= Number(threshold));
    
    const { rewardMultiplier = 1 } = STAKING_LEVELS[level] || {};
    return amount * rewardMultiplier * (duration / 365);
  }