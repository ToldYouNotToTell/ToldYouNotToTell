import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import styles from './buttonStyles.module.css';

export const DisconnectButton = () => {
  const { disconnect } = useWallet();

  return (
    <button
      onClick={disconnect}
      className={styles.secondaryButton}
    >
      <i className="fas fa-sign-out-alt"></i>
      Disconnect
    </button>
  );
};

export default DisconnectButton;