// src/components/RewardsInfo.tsx
'use client';

import React from 'react';

export type RewardsInfoProps = {
  totalPool: number;       // общий объём пула
  nextDistribution: Date;  // дата следующего распределения
};

export default function RewardsInfo({
  totalPool,
  nextDistribution,
}: RewardsInfoProps) {
  const formattedDate = nextDistribution.toLocaleString();

  return (
    <div className="rewards-info p-4 bg-card-bg rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Rewards Pool</h2>
      <p className="mb-1">
        <strong>Total Pool:</strong> {totalPool.toLocaleString()} TNTT
      </p>
      <p>
        <strong>Next Distribution:</strong> {formattedDate}
      </p>
    </div>
  );
}