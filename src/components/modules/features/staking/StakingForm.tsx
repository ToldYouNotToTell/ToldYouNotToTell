// src/components/modules/features/staking/StakingForm.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import { useStaking } from '@/contexts/StakingContext';

const STAKING_LEVELS: { amount: number; level: number }[] = [
  { amount: 10000, level: 1 },
  { amount: 25000, level: 2 },
  { amount: 50000, level: 3 },
  { amount: 100000, level: 4 },
  { amount: 200000, level: 5 },
];

export default function StakingForm() {
  const { stakeTokens, stakedAmount } = useStaking();
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (amount < STAKING_LEVELS[0].amount) {
      setError(`Minimum stake is ${STAKING_LEVELS[0].amount.toLocaleString()} TNTT.`);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await stakeTokens(amount);
      setAmount(0);
    } catch {
      setError('Failed to stake tokens. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staking-page" id="stakingPage">
      <h1>Stake TNTT Tokens</h1>
      <form className="staking-form" onSubmit={handleSubmit}>
        <p>Stake your TNTT tokens to earn rewards and increase your visibility</p>

        <div className="form-group staking-amount">
          <label htmlFor="stakeAmount">Amount to Stake:</label>
          <input
            id="stakeAmount"
            type="number"
            min={STAKING_LEVELS[0].amount}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="staking-levels">
          <h3>Staking Levels</h3>
          <ul>
            {STAKING_LEVELS.map(({ amount, level }) => (
              <li key={level}>
                {amount.toLocaleString()} TNTT: Level {level}
              </li>
            ))}
          </ul>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button
          type="submit"
          className="stake-btn"
          disabled={loading}
        >
          {loading ? 'Staking…' : 'Stake Tokens'}
        </button>

        {stakedAmount != null && (
          <p className="staking-balance">
            Your current staked balance: {stakedAmount.toLocaleString()} TNTT
          </p>
        )}
      </form>
    </div>
);
}