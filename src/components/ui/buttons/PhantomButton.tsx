// src/components/ui/buttons/PhantomButton.tsx
'use client';

import React from 'react';
import { useWeb3 } from '@/hooks/useWeb3';

/**
 * Кнопка подключения Phantom Wallet.
 * — При клике вызывает connectWallet из хука useWeb3.
 * — Если кошелёк подключён, отображает короткий адрес.
 */
export default function PhantomButton() {
  const { connectWallet, walletAddress, isConnected } = useWeb3();

  return (
    <button
      type="button"
      className="phantom-btn"
      onClick={connectWallet}
    >
      <i className="fas fa-wallet" />
      {' '}
      {isConnected
        ? `${walletAddress?.slice(0, 4)}…${walletAddress?.slice(-4)}`
        : 'Connect'}
    </button>
  );
}