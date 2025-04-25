// src/components/ui/buttons/BoostButton.tsx
'use client';

import React, { useState } from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import BoostModal from '@/components/modals/BoostModal';

export type BoostButtonProps = {
  postId: number;
};

export default function BoostButton({ postId }: BoostButtonProps) {
  const { walletAddress, isConnected, boostPost } = useWeb3();
  const [showModal, setShowModal] = useState(false);

  const handleBoost = async (amount: number) => {
    if (!isConnected || !boostPost) {
      alert('Please connect your wallet first');
      return;
    }
    try {
      await boostPost(postId, amount);
      setShowModal(false);
    } catch (error) {
      console.error('Boost failed:', error);
      alert('Boost operation failed');
    }
  };

  return (
    <>
      <button
        type="button"
        className="boost-btn"
        onClick={() => setShowModal(true)}
        disabled={!isConnected}
        title={!isConnected ? 'Connect wallet to boost' : 'Boost post visibility'}
      >
        <i className="fas fa-rocket" />
      </button>

      {showModal && (
        <BoostModal
          onClose={() => setShowModal(false)}
          onBoost={handleBoost}
        />
      )}
    </>
  );
}