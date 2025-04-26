// src/components/ui/buttons/BoostButton.tsx
'use client';

import React, { useState } from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import BoostModal from '@/components/modals/BoostModal';

export type BoostButtonProps = {
  postId: string;
};

export default function BoostButton({ postId }: BoostButtonProps) {
  const { isPhantomInstalled, connectWallet, isConnected, boostPost } = useWeb3();
  const [showModal, setShowModal] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);

  const handleBoost = async (amount: number) => {
    if (!isPhantomInstalled) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    if (!isConnected) {
      try {
        await connectWallet();
      } catch (error) {
        console.error('Connection error:', error);
        return;
      }
    }
    
    setIsBoosting(true);
    try {
      await boostPost(postId, amount);
      setShowModal(false);
    } catch (error) {
      console.error('Boost failed:', error);
      alert(`Boost failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsBoosting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="boost-btn"
        onClick={() => setShowModal(true)}
        disabled={!isPhantomInstalled || isBoosting}
        title={!isPhantomInstalled 
          ? 'Install Phantom Wallet' 
          : isConnected 
            ? 'Boost post visibility' 
            : 'Connect wallet to boost'}
      >
        {isBoosting ? 'Processing...' : <i className="fas fa-rocket" />}
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