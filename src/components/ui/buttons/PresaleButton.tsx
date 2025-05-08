"use client";

import { useWallet } from "@/hooks/useWallet";
import styles from "@/styles/buttons.module.css";

export default function PresaleButton() {
  const { setShowPresaleModal } = useWallet();

  const handleClick = () => {
    setShowPresaleModal(true);
  };

  return (
    <button
      onClick={handleClick}
      className={styles.presaleButton}
      aria-label="Participate in presale"
    >
      {/* Иконка слева с отступом */}
      <i className="fas fa-coins" style={{ marginRight: "0.4rem" }}></i>
      Presale
    </button>
  );
}
