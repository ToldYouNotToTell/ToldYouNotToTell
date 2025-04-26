import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  icon: string;
  onClick: () => void;
  ariaLabel: string;
}

export const IconButton = ({ icon, onClick, ariaLabel }: Props) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles.iconButton}`}
    aria-label={ariaLabel}
  >
    <i className={`fas ${icon}`}></i>
  </button>
);

export default IconButton;