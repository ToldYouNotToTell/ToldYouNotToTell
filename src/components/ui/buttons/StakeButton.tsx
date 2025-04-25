// src/components/ui/buttons/StakeButton.tsx
'use client';

import React from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import { ReactIcon } from '@/components/ui/icons/ReactIcon';

export default function StakeButton() {
  const { isConnected } = useWeb3();

  return (
    <button 
      className="stake-btn"
      onClick={() => {
        if (!isConnected) {
          alert('Please connect Phantom wallet first!');
          return;
        }
        window.location.href = '/staking';
      }}
    >
      <ReactIcon name="lock" prefix="fas" /> Stake TNTT
    </button>
  );
}