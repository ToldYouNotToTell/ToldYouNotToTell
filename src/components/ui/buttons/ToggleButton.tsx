import React, { useState } from 'react';
import styles from './buttonStyles.module.css';

interface Props {
  initialActive?: boolean;
  onToggle: (active: boolean) => void;
  activeLabel?: string;
  inactiveLabel?: string;
}

export const ToggleButton = ({
  initialActive = false,
  onToggle,
  activeLabel = 'On',
  inactiveLabel = 'Off'
}: Props) => {
  const [active, setActive] = useState(initialActive);

  const handleClick = () => {
    const newState = !active;
    setActive(newState);
    onToggle(newState);
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${styles.toggleButton} ${
        active ? styles.active : ''
      }`}
    >
      {active ? activeLabel : inactiveLabel}
    </button>
  );
};

export default ToggleButton;