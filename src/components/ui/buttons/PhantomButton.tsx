// src/components/ui/buttons/PhantomButton.tsx
'use client';

import React from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import { ReactIcon } from '@/components/ui/icons/ReactIcon';

export default function PhantomButton() {
  const { connectWallet, disconnectWallet, walletAddress, isConnected } = useWeb3();

  return (
    <button
      type="button"
      className="phantom-btn"
      onClick={isConnected ? disconnectWallet : connectWallet}
    >
      <ReactIcon name="wallet" prefix="fas" />
      {isConnected
        ? `${walletAddress?.slice(0, 4)}…${walletAddress?.slice(-4)}`
        : 'Connect Phantom'}
    </button>
  );
}