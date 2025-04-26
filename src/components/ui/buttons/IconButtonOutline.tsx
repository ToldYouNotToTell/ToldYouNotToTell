import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  icon: string;
  onClick: () => void;
  ariaLabel: string; // Обязательный атрибут для доступности
  title?: string;    // Опциональный tooltip
}

export const IconButtonOutline = ({ 
  icon, 
  onClick, 
  ariaLabel,
  title 
}: Props) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles.iconOutline}`}
    aria-label={ariaLabel}
    title={title || ariaLabel} // Fallback на ariaLabel если title не указан
  >
    <i className={`fas ${icon}`} aria-hidden="true"></i>
  </button>
);

export default IconButtonOutline;