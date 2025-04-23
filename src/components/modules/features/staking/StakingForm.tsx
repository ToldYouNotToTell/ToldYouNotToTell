'use client';

import { useState } from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import { STAKING_LEVELS } from '@/lib/utils/staking';

export default function StakingForm() {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(30);
  const { walletAddress, stakeTokens } = useWeb3();

  const calculateRewards = () => {
    const level = Object.keys(STAKING_LEVELS)
      .reverse()
      .find(threshold => amount >= Number(threshold));
    return level ? STAKING_LEVELS[level].rewardMultiplier * amount * (duration / 365) : 0;
  };

  const handleStake = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    try {
      await stakeTokens(amount);
      alert(`Successfully staked ${amount} TNTT for ${duration} days`);
    } catch (error) {
      console.error('Staking error:', error);
      alert('Staking failed');
    }
  };

  return (
    <div id="stakingContent">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p>Stake your TNTT tokens to earn rewards and increase your visibility</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Amount to Stake (TNTT):</label>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="1000"
          step="1000"
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            background: 'var(--search-bg)',
            color: 'var(--text-color)'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Duration (days):</label>
        <input 
          type="number" 
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          min="1"
          max="365"
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            background: 'var(--search-bg)',
            color: 'var(--text-color)'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Estimated Rewards</h3>
        <p>{calculateRewards().toFixed(2)} TNTT</p>
        <small>Based on current staking level</small>
      </div>
      
      <button 
        onClick={handleStake}
        style={{
          width: '100%',
          padding: '10px',
          background: 'var(--staking-color)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Stake Tokens
      </button>
    </div>
  );
}