// src/components/ui/cards/BoostTiers.tsx
"use client";

import React from "react";

import { BOOST_TIERS } from "@/lib/boostConfig";
import type { BoostTier } from "@/types/boost"; // Тип теперь используется

// Временные константы для decay и позиций
const DECAY_RATES: Record<BoostTier["name"], number> = {
  // Явное использование типа
  Basic: 0.3,
  "Start+": 0.25,
  Advanced: 0.15,
  Premium: 0.1,
  Elite: 0.05,
  GodMode: 0.02,
};

const POSITION_RANGES: Record<BoostTier["name"], [number, number]> = {
  // И здесь
  GodMode: [1, 10],
  Elite: [11, 30],
  Premium: [31, 50],
  Advanced: [51, 100],
  "Start+": [101, 150],
  Basic: [151, 200],
};

type BoostTiersProps = {
  boostAmount: number;
  boostStartTime: number;
};

export function BoostTiers({ boostAmount, boostStartTime }: BoostTiersProps) {
  const tier = BOOST_TIERS.find((t: BoostTier) => boostAmount >= t.amount); // Явное указание типа
  const decayRate = tier ? DECAY_RATES[tier.name] : 0;
  const currentWeight = decayRate
    ? boostAmount *
      Math.pow(1 - decayRate, (Date.now() - boostStartTime) / (1000 * 60 * 60))
    : 0;

  if (!tier) {
    return (
      <div className="boost-tier-card organic">
        <h4>Organic</h4>
        <p>No boost applied</p>
      </div>
    );
  }

  return (
    <div
      className={`boost-tier-card ${tier.name.toLowerCase().replace("+", "-plus")}`}
      style={{ borderColor: tier.color }}
    >
      <div className="tier-header">
        <span className="tier-emoji">{tier.emoji}</span>
        <h4>{tier.name}</h4>
      </div>
      <div className="tier-stats">
        <p>
          <strong>Current weight:</strong> {currentWeight.toFixed(2)} USD
        </p>
        <p>
          <strong>Decay rate:</strong> {(decayRate * 100).toFixed(1)}%/hour
        </p>
        <p>
          <strong>Positions:</strong> {POSITION_RANGES[tier.name][0]}–
          {POSITION_RANGES[tier.name][1]}
        </p>
        <p>
          <strong>Rotation:</strong> every 15 mins
        </p>
      </div>
    </div>
  );
}
