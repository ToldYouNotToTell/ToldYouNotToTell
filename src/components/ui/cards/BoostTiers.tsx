// src/components/ui/cards/BoostTiers.tsx
'use client';

import React from 'react';
import type { BoostTier } from '@/lib/utils/boost';
import { calculateBoostWeight, getBoostTier } from '@/lib/utils/boost';

type BoostTiersProps = {
  /** Изначальная сумма буста (USD) */
  boostAmount: number;
  /** Метка времени покупки буста (ms) */
  boostStartTime: number;
};

/**
 * Компонент отображает текущее состояние буста:
 * - Название уровня
 * - Текущий вес
 * - Диапазон позиций и decay-rate
 */
export function BoostTiers({ boostAmount, boostStartTime }: BoostTiersProps) {
  const tier = getBoostTier(boostAmount);
  const currentWeight = calculateBoostWeight(boostAmount, boostStartTime);

  if (!tier) {
    return (
      <div className="boost-tier-card organic">
        <h4>Organic</h4>
        <p>No boost applied</p>
      </div>
    );
  }

  return (
    <div className="boost-tier-card">
      <h4>{tier.name}</h4>
      <p>
        Current weight: <strong>{currentWeight.toFixed(2)}</strong> TNTT
      </p>
      <p>
        Positions: {tier.trendingPositionRange![0]} –{' '}
        {tier.trendingPositionRange![1]}
      </p>
      <p>Decay rate: {(tier.decayRate * 100).toFixed(1)}% / hour</p>
      <p>Rotation every {tier.rotationIntervalMinutes} minutes</p>
    </div>
  );
}