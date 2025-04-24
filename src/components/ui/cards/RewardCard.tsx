// src/components/ui/cards/RewardCard.tsx
'use client';

import React from 'react';
import ClockIcon from '@/components/ui/icons/ClockIcon';

import type { DistributionItem } from '@/types/rewards';

export type RewardsCardProps = {
  /** Часы до следующего распределения */
  hoursLeft: number;
  /** Минуты до следующего распределения */
  minutesLeft: number;
  /** Текущий пул наград (TNTT) */
  pool: number;
  /** Структура распределения наград */
  distribution: DistributionItem[];
};

export default function RewardsCard({
  hoursLeft,
  minutesLeft,
  pool,
  distribution,
}: RewardsCardProps) {
  return (
    <div className="rewards-page">
      <h1>Rewards Pool</h1>

      {/* Next Reward Distribution */}
      <div className="rewards-section" style={{ textAlign: 'center', marginBottom: 20 }}>
        <h3>
          <ClockIcon size={14} style={{ marginRight: 4 }} />
          Next Reward Distribution
        </h3>
        <p>{hoursLeft}h {minutesLeft}m remaining</p>
      </div>

      {/* Current Pool */}
      <div className="rewards-section" style={{ marginBottom: 20 }}>
        <h3>Current Rewards Pool</h3>
        <p>{pool} TNTT</p>
      </div>

      {/* Distribution Structure */}
      <div className="rewards-section">
        <h3>Distribution Structure</h3>
        <ul className="rewards-distribution-list">
          {distribution.map(item => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.percent}%{item.description ? ` — ${item.description}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}