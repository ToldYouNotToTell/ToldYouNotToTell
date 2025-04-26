import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  icon: string;
  onClick: () => void;
  ariaLabel: string; // Обязательный параметр
  title?: string;    // Дополнительный текст при наведении
}

export const IconButtonGhost = ({ 
  icon, 
  onClick, 
  ariaLabel,
  title 
}: Props) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles.iconGhost}`}
    aria-label={ariaLabel}
    title={title || ariaLabel}
  >
    <i className={`fas ${icon}`} aria-hidden="true"></i>
    <span className="sr-only">{ariaLabel}</span>
  </button>
);

export default IconButtonGhost;