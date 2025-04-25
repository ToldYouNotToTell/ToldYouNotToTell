'use client';
import React, { useState } from 'react';

const STAKING_LEVELS = [
  { amount: 10000, level: 1 },
  { amount: 25000, level: 2 },
  { amount: 50000, level: 3 },
  { amount: 100000, level: 4 },
  { amount: 200000, level: 5 },
];

export default function StakingForm() {
  const [amount, setAmount] = useState<number>(10000);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Trying to stake:', amount);
    setError(null);
  };

  return (
    <div className="staking-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="stakeAmount">Amount to Stake (TNTT):</label>
          <input
            id="stakeAmount"
            type="number"
            min={STAKING_LEVELS[0].amount}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-label="Enter TNTT amount to stake"
          />
        </div>

        <button 
          type="submit"
          aria-label="Confirm stake"
        >
          Stake Tokens
        </button>
        
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}