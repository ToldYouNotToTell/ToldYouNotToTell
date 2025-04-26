import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export const SecondaryButtonGhost = ({ onClick, children }: Props) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles.secondaryGhost}`}
  >
    {children}
  </button>
);

export default SecondaryButtonGhost;