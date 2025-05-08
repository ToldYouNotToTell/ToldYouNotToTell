// src/components/ui/buttons/BoostButton.tsx
"use client";
import { Connection } from "@solana/web3.js";
import { useState } from "react";

import BoostModal from "@/components/modals/BoostModal";
import { useWeb3 } from "@/contexts/Web3Context";
import { BOOST_TIERS } from "@/lib/boostConfig";

interface BoostButtonProps {
  _postId: string; // Было _postId, теперь postId
}

export default function BoostButton({ _postId }: BoostButtonProps) {
  const { isConnected, connectWallet, walletAddress, connection } = useWeb3();
  const [showModal, setShowModal] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);

  const handleBoost = async (tierId: number) => {
    if (!isConnected || !walletAddress) {
      try {
        await connectWallet();
      } catch {
        alert("Wallet connection failed");
        return;
      }
    }

    const tier = BOOST_TIERS.find((t) => t.id === tierId);
    if (!tier) return;

    setIsBoosting(true);
    try {
      const transaction = await sendBoostTransaction(
        walletAddress!,
        tier.amount,
        connection,
      );

      const response = await fetch("/api/boost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: _postId,
          amount: tier.amount,
          tier: tier.name,
          transactionId: transaction.signature,
          walletAddress: walletAddress,
        }),
      });

      if (!response.ok) throw new Error("Boost registration failed");

      alert(`Post boosted with ${tier.name} tier!`);
      setShowModal(false);
    } catch (error) {
      alert("Boost failed: " + (error as Error).message);
    } finally {
      setIsBoosting(false);
    }
  };

  const sendBoostTransaction = async (
    _walletAddress: string,
    _amount: number,
    _connection: Connection,
  ) => {
    // Заглушка для реальной реализации
    return {
      signature: "tx-" + Math.random().toString(36).substring(2, 10),
    };
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isBoosting}
        className="boost-btn"
        aria-label="Boost post"
      >
        {isBoosting ? "Processing..." : "Boost Post"}
      </button>

      {showModal && (
        <BoostModal
          onClose={() => setShowModal(false)}
          onBoost={handleBoost}
          boostTiers={BOOST_TIERS}
        />
      )}
    </>
  );
}
