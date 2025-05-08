// src/app/rewards/page.tsx

import RewardsInfo from "@/components/modules/rewards/RewardsInfo";
import BackButton from "@/components/ui/buttons/BackButton";

export default function RewardsPage() {
  // Здесь вы можете подставить реальные данные из API
  const totalPool = 1000; // пример: общий объём пула TYNT
  const now = new Date();
  const nextDistribution = new Date(now);
  // делаем следующее распределение в полночь UTC следующего дня
  nextDistribution.setUTCDate(now.getUTCDate() + 1);
  nextDistribution.setUTCHours(0, 0, 0, 0);

  return (
    <div className="rewards-page">
      <h1>Rewards Pool</h1>
      <RewardsInfo totalPool={totalPool} nextDistribution={nextDistribution} />
      <BackButton />
    </div>
  );
}
