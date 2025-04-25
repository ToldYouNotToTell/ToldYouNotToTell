// src/components/modals/BoostModal.tsx
'use client';

import React, { useState } from 'react';
import { boostTiers } from '@/lib/utils/boost';

export type BoostModalProps = {
  /** Закрыть модалку */
  onClose: () => void;
  /** Колбэк с числом (amount) для буста */
  onBoost: (amount: number) => void;
};

export default function BoostModal({ onClose, onBoost }: BoostModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedAmount !== null) {
      onBoost(selectedAmount);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close boost modal"
          title="Close"
        >
          ×
        </button>

        <h2>Boost Your Post</h2>

        <div className="boost-options">
          {boostTiers.map((tier) => (
            <div
              key={tier.name}
              className={`boost-option ${
                selectedAmount === tier.minWeight ? 'selected' : ''
              }`}
              onClick={() => setSelectedAmount(tier.minWeight)}
            >
              <div className="boost-option__name">{tier.name}</div>
              <div className="boost-option__price">
                ${tier.minWeight}
                {tier.maxWeight === Infinity ? '+' : `–${tier.maxWeight}`}
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
          disabled={selectedAmount === null}
          onClick={handleConfirm}
        >
          Confirm Boost
        </button>
      </div>
    </div>
  );
}