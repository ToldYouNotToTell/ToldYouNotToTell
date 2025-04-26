import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import styles from './buttonStyles.module.css';

export const StakeButton = () => {
  const { isConnected } = useWallet();

  return (
    <button
      className={`${styles.button} ${styles.stakeButton}`}
      disabled={!isConnected}
    >
      <i className="fas fa-lock"></i>
      Stake TNTT
    </button>
  );
};

export default StakeButton;