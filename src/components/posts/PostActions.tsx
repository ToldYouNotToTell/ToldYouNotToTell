// src/components/posts/PostActions.tsx
"use client";
import { useState } from "react";

import BoostModal from "@/components/modals/BoostModal";
import { BOOST_TIERS } from "@/lib/boostConfig";
import type { Post } from "@/types/post";

export default function PostActions({
  post,
  isAuthor,
}: {
  post: Post;
  isAuthor: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);

  const handleBoost = async (_tierId: number) => {
    if (!isAuthor) return;
    setIsBoosting(true);
    try {
      // Здесь должна быть логика буста
      setShowModal(false);
    } finally {
      setIsBoosting(false);
    }
  };

  const currentTier = post.boostTier
    ? BOOST_TIERS.find((t) => t.name === post.boostTier?.name)
    : undefined;

  return (
    <div className="post-actions">
      {isAuthor && (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="boost-button"
            disabled={isBoosting}
          >
            {isBoosting ? "Processing..." : "Boost Post"}
          </button>
          {showModal && (
            <BoostModal
              onClose={() => !isBoosting && setShowModal(false)}
              onBoost={handleBoost}
              boostTiers={BOOST_TIERS}
            />
          )}
        </>
      )}
      {currentTier && <div className="boost-badge">{currentTier.emoji}</div>}
    </div>
  );
}
