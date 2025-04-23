import RewardsInfo from '@/components/modules/features/rewards/RewardsInfo';
import BackButton from '@/components/ui/buttons/BackButton';

export default function RewardsPage() {
  return (
    <div className="rewards-page">
      <h1>Rewards Pool</h1>
      <RewardsInfo />
      <BackButton />
    </div>
  );
}