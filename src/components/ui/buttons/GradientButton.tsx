import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  gradient?: string;
}

export const GradientButton = ({ 
  onClick, 
  children,
  gradient = 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)'
}: Props) => (
  <button
    onClick={onClick}
    className={styles.button}
    style={{ background: gradient }}
  >
    {children}
  </button>
);

export default GradientButton;