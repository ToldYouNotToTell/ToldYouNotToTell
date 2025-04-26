// src/lib/utils/boost.ts

export interface BoostTier {
  name: string;
  minAmount: number; // USD
  maxAmount: number; // USD
  decayRate: number;
  trendingPositionRange: [number, number];
  rotationIntervalMinutes: number;
}

export const boostTiers: BoostTier[] = [
  {
    name: "Small Boost",
    minAmount: 10, // USD
    maxAmount: 50,
    decayRate: 0.02, // 2%/hr
    trendingPositionRange: [10, 20],
    rotationIntervalMinutes: 30
  },
  {
    name: "Medium Boost",
    minAmount: 50,
    maxAmount: 200,
    decayRate: 0.015, // 1.5%/hr
    trendingPositionRange: [5, 15],
    rotationIntervalMinutes: 20
  },
  {
    name: "Large Boost",
    minAmount: 200,
    maxAmount: Infinity,
    decayRate: 0.01, // 1%/hr
    trendingPositionRange: [1, 10],
    rotationIntervalMinutes: 10
  }
];

export function getBoostTier(boostAmount: number): BoostTier | undefined {
  return boostTiers.find(tier => 
    boostAmount >= tier.minAmount && 
    boostAmount < tier.maxAmount
  );
}

export function calculateBoostWeight(boostAmount: number, boostStartTime: number): number {
  const tier = getBoostTier(boostAmount);
  if (!tier || boostAmount <= 0) return 0;

  const hoursPassed = (Date.now() - boostStartTime) / (1000 * 60 * 60);
  const decayFactor = Math.pow(1 - tier.decayRate, hoursPassed);
  const currentWeight = boostAmount * decayFactor;
  
  // Ensure weight doesn't go below 0
  return Math.max(0, currentWeight);
}