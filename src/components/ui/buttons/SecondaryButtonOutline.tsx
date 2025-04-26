import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export const SecondaryButtonOutline = ({ onClick, children }: Props) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles.secondaryOutline}`}
  >
    {children}
  </button>
);

export default SecondaryButtonOutline;