import React from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  text: string;
  onCopy?: () => void;
}

export const CopyButton = ({ text, onCopy }: Props) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    onCopy?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${styles.copyButton}`}
      aria-label="Copy to clipboard"
    >
      <i className="far fa-copy"></i>
    </button>
  );
};

export default CopyButton;