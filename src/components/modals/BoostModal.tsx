import React, { useState } from "react";

import { BoostTier } from "@/types/boost";

interface BoostModalProps {
  onClose: () => void;
  onBoost: (tierId: number) => Promise<void>;
  boostTiers: BoostTier[];
}

export default function BoostModal({
  onClose,
  onBoost,
  boostTiers,
}: BoostModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBoost = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      await onBoost(selectedId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Кнопка закрытия */}
        <button
          className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 dark:text-gray-300"
          onClick={onClose}
        >
          ×
        </button>

        {/* Заголовок */}
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          Boost Your Post
        </h2>

        {/* Сетка тарифов */}
        <div className="grid gap-4 mb-6 grid-cols-2 sm:grid-cols-3">
          {boostTiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedId(tier.id)}
              className={`
                flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all
                border ${
                  selectedId === tier.id
                    ? "border-2 border-purple-500 bg-purple-50 dark:bg-purple-900"
                    : "border-gray-200 dark:border-gray-600"
                }
                hover:border-purple-500
                bg-white dark:bg-gray-700
              `}
            >
              <div className="text-3xl mb-2">{tier.emoji}</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {tier.name}
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {tier.amount} SOL
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка оплаты */}
        <button
          onClick={handleBoost}
          disabled={!selectedId || loading}
          className={`
            w-full py-3 flex items-center justify-center rounded-lg font-semibold
            bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white
            transition-opacity hover:opacity-90
            ${!selectedId || loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Processing..." : "Pay With SOL"}
        </button>
      </div>
    </div>
  );
}
