// src/app/promotion/page.tsx
import React from "react";

import BackButton from "@/components/ui/buttons/BackButton";
import { BoostTiers } from "@/components/ui/cards/BoostTiers";

export default function PromotionPage() {
  // TODO: сюда подставить реальные значения из вашего состояния/фетча
  const boostAmount = 50;
  const boostStartTime = Date.now() - 2 * 3600_000; // пример: 2 часа назад

  return (
    <div>
      <BackButton />
      <BoostTiers boostAmount={boostAmount} boostStartTime={boostStartTime} />
    </div>
  );
}
