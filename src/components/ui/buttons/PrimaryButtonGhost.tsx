import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const PrimaryButtonGhost = ({ onClick, children, disabled }: Props) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.button} ${styles.primaryGhost}`}
  >
    {children}
  </button>
);

export default PrimaryButtonGhost;