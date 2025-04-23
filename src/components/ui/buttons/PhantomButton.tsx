'use client';

import { useWeb3 } from '@/hooks/useWeb3';
import { useEffect, useState } from 'react';

export default function PhantomButton() {
  const { connectWallet, walletAddress, isConnected } = useWeb3();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Проверка наличия Phantom Wallet при загрузке
    const checkPhantom = () => {
      if (window.solana?.isPhantom) {
        console.log('Phantom Wallet is installed');
      }
    };
    window.addEventListener('load', checkPhantom);
    return () => window.removeEventListener('load', checkPhantom);
  }, []);

  const handleClick = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Connection error:', error);
    }
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
      <i className="fas fa-wallet"></i> {`${walletAddress?.slice(0, 4)}...${walletAddress?.slice(-4)}`}
    </button>
  );
}