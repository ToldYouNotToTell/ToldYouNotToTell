'use client';
import React, { useEffect, useState } from 'react';
import { connectPhantom } from '@/lib/uiActions';
import { useWeb3 } from '@/hooks/useWeb3';

export default function PhantomButton() {
  const { walletAddress, isConnected } = useWeb3();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (window.solana?.isPhantom) {
      console.log('Phantom Wallet is installed');
    }
  }, []);

  const handleClick = async () => {
    await connectPhantom();
  };

  if (!isConnected) {
    return (
      <button
        className="phantom-btn"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <i className="fas fa-wallet"></i> Connect
      </button>
    );
  }

  return (
    <button
      className="phantom-btn"
      style={{
        background: isHovered
          ? 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)'
          : 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className="fas fa-wallet"></i> {`${walletAddress?.slice(0,4)}...${walletAddress?.slice(-4)}`}
    </button>
  );
}