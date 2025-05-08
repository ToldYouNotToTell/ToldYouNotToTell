"use client";

import React from "react";

import { useWeb3 } from "@/hooks/useWeb3";
import styles from "@/styles/buttons.module.css";

export default function PhantomButton() {
  const { connectWallet, disconnectWallet, walletAddress, isConnected } =
    useWeb3();

  return (
    <button
      onClick={isConnected ? disconnectWallet : connectWallet}
      className={`${styles.phantomButton} ${isConnected ? styles.connected : ""}`}
    >
      {/* Иконка слева от текста */}
      <i className="fas fa-wallet" style={{ marginRight: "0.4rem" }}></i>
      {isConnected
        ? `${walletAddress?.slice(0, 4)}…${walletAddress?.slice(-4)}`
        : "Connect"}
    </button>
  );
}
