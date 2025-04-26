import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import styles from './buttonStyles.module.css';

export const PresaleButton = () => {
  const { setShowPresaleModal } = useWallet();

  return (
    <button
      onClick={() => setShowPresaleModal(true)}
      className={styles.presaleButton}
    >
      <i className="fas fa-coins"></i>
      Presale
    </button>
  );
};

export default PresaleButton;