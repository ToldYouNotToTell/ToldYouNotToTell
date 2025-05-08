// src/components/modals/PresaleModal.tsx
"use client";

import React from "react";

import { ReactIcon } from "@/components/ui/icons/ReactIcon";
import { useWeb3 } from "@/hooks/useWeb3";

type PresaleModalProps = {
  onClose: () => void;
};

export default function PresaleModal({ onClose }: PresaleModalProps) {
  const { connectWallet, walletAddress, isConnected } = useWeb3();

  return (
    <div className="presale-modal">
      <div className="presale-modal__header">
        <h2>Solana Presale</h2>
        <button
          type="button"
          className="presale-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <ReactIcon name="times" prefix="fas" />
        </button>
      </div>

      <div className="presale-modal__body">
        <p className="presale-rate">1 SOL = 1000 TKN</p>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={connectWallet}
            disabled={isConnected}
          >
            <ReactIcon name="wallet" prefix="fas" />
            {isConnected ? "Connected" : "Connect Phantom"}
          </button>
        </div>

        {walletAddress && (
          <p className="wallet-info">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        )}
      </div>
    </div>
  );
}
