// src/components/modals/PresaleModal.tsx
'use client';

import React, { useState } from 'react';
import { ReactIcon } from '@/components/ui/icons/ReactIcon';
import { useWeb3 } from '@/hooks/useWeb3';

type PresaleModalProps = {
  onClose: () => void;
};

export default function PresaleModal({ onClose }: PresaleModalProps) {
  const [amount, setAmount] = useState<number>(1);
  const { connectWallet } = useWeb3();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: логика покупки пресейла через connectWallet() и amount
  };

  return (
    <div className="presale-modal">
      <div className="presale-modal__header">
        <h2>Presale</h2>
        <button
          type="button"
          className="presale-modal__close"
          onClick={onClose}
          aria-label="Close presale modal"
          title="Close"
        >
          <ReactIcon name="times" prefix="fas" />
        </button>
      </div>

      <div className="presale-modal__body">
        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '15px 0',
            color: 'var(--primary-color)',
          }}
        >
          1 USDT = 100 TNTT
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="presale-amount">Amount (USDT):</label>
            <input
              id="presale-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={1}
              step={1}
              placeholder="Enter amount in USDT"
              aria-label="Amount in USDT"
              required
              className="form-control"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              Buy with USDT
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={connectWallet}
            >
              <ReactIcon name="wallet" prefix="fas" /> Connect Wallet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}