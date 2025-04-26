import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import styles from './buttonStyles.module.css';

export const ConnectWalletButton = () => {
  const { connect, isConnected, shortAddress } = useWallet();

  return (
    <button 
      onClick={connect}
      className={`${styles.gradientButton} ${isConnected ? styles.connected : ''}`}
    >
      <i className="fas fa-wallet"></i>
      {isConnected ? shortAddress : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWalletButton;