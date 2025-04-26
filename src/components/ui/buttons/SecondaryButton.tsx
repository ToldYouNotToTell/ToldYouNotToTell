import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  icon?: string;
}

export const SecondaryButton = ({ onClick, children, icon }: Props) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles.secondaryButton}`}
  >
    {icon && <i className={`fas ${icon}`}></i>}
    {children}
  </button>
);

export default SecondaryButton;