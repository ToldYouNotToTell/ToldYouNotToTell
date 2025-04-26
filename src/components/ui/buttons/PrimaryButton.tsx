import React from 'react';
import styles from './buttonStyles.module.css';

interface PrimaryButtonProps {
  onClick: () => void;
  icon?: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const PrimaryButton = ({
  onClick,
  icon,
  children,
  disabled,
  className = ''
}: PrimaryButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.primaryButton} ${className}`}
  >
    {icon && <i className={`fas ${icon}`}></i>}
    {children}
  </button>
);

export default PrimaryButton;