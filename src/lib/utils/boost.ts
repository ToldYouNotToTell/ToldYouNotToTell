// Пример структуры бустов в SOL
export const boostTiers = [
  {
    name: "Small Boost",
    minWeight: 0.1, // SOL
    maxWeight: 0.5,
    decayRate: 0.02 // 2%/hr
  },
  {
    name: "Medium Boost",
    minWeight: 0.5,
    maxWeight: 2,
    decayRate: 0.015
  },
  {
    name: "Large Boost",
    minWeight: 2,
    maxWeight: Infinity,
    decayRate: 0.01
  }
];