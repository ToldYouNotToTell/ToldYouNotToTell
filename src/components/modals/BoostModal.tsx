"use client";

import { BOOST_TIERS } from "@/lib/utils/boost";

export default function BoostModal({
  onClose,
  onBoost,
}: {
  onClose: () => void;
  onBoost: (amount: number) => void;
}) {
  const [selectedTier, setSelectedTier] = useState<keyof typeof BOOST_TIERS>(5);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Boost Your Post</h2>

        <div className="boost-options">
          {Object.entries(BOOST_TIERS).map(([amount, tier]) => (
            <div
              key={amount}
              className={`boost-option ${
                selectedTier === Number(amount) ? "selected" : ""
              }`}
              onClick={() => setSelectedTier(Number(amount))}
            >
              <div className="boost-icon">{tier.icon}</div>
              <div className="boost-details">
                <h3>{tier.name}</h3>
                <p>
                  ${amount} - {tier.max} hours visibility
                </p>
                <small>Priority decay: -{tier.decay * 100}% per hour</small>
              </div>
            </div>
          ))}
        </div>

        <button className="boost-confirm" onClick={() => onBoost(selectedTier)}>
          Pay with USDT
        </button>
      </div>
    </div>
  );
}
