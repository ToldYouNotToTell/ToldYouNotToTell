"use client";

import { useWeb3 } from "@/hooks/useWeb3";
import { useState } from "react";
import BoostModal from "../modals/BoostModal";

export default function BoostButton({ postId }: { postId: number }) {
  const { walletAddress, boostPost } = useWeb3();
  const [showModal, setShowModal] = useState(false);

  const handleBoost = async (amount: number) => {
    if (!walletAddress) {
      alert("Please connect your wallet first");
      return;
    }
    try {
      await boostPost(postId, amount);
      setShowModal(false);
    } catch (error) {
      console.error("Boost failed:", error);
    }
  };

  return (
    <>
      <button
        className="boost-btn"
        onClick={() => setShowModal(true)}
        title="Boost post visibility"
      >
        <i className="fas fa-rocket"></i>
      </button>

      {showModal && (
        <BoostModal onClose={() => setShowModal(false)} onBoost={handleBoost} />
      )}
    </>
  );
}
