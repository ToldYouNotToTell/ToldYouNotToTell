// src/components/modals/BoostModal.tsx
'use client';

import React, { useState } from 'react';
import { boostTiers } from '@/lib/utils/boost';
import { useWeb3 } from '@/hooks/useWeb3';
import { ReactIcon } from '@/components/ui/icons/ReactIcon';

export type BoostModalProps = {
  onClose: () => void;
  onBoost: (amount: number) => Promise<void>;
};

export default function BoostModal({ onClose, onBoost }: BoostModalProps) {
  const { isPhantomInstalled, connectWallet, walletAddress, isConnected } = useWeb3();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (selectedAmount === null) return;
    
    setIsLoading(true);
    try {
      await onBoost(selectedAmount);
      onClose();
    } catch (error) {
      console.error('Boost failed:', error);
      alert(`Boost failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2>Boost Your Post</h2>

        {!isPhantomInstalled ? (
          <div className="wallet-connect-prompt">
            <p>Phantom wallet is not installed</p>
            <button
              type="button"
              className="btn-connect"
              onClick={() => window.open('https://phantom.app/', '_blank')}
            >
              <ReactIcon name="external-link-alt" prefix="fas" /> Install Phantom
            </button>
          </div>
        ) : !isConnected ? (
          <div className="wallet-connect-prompt">
            <p>Connect your Phantom wallet to boost:</p>
            <button
              type="button"
              className="btn-connect"
              onClick={connectWallet}
            >
              <ReactIcon name="wallet" prefix="fas" /> Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="boost-options">
              {boostTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`boost-option ${
                    selectedAmount === tier.minAmount ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedAmount(tier.minAmount)}
                >
                  <div className="boost-option__name">{tier.name}</div>
                  <div className="boost-option__price">
                    {tier.minAmount} SOL
                    {tier.maxAmount === Infinity ? '+' : `–${tier.maxAmount}`}
                  </div>
                  <div className="boost-option__decay">
                    Decay: {(tier.decayRate * 100).toFixed(0)}%/hr
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="boost-submit"
              disabled={selectedAmount === null || isLoading}
              onClick={handleConfirm}
            >
              {isLoading ? 'Processing...' : 'Confirm Boost'}
            </button>

            {walletAddress && (
              <div className="wallet-info">
                Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}