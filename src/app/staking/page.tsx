import StakingForm from "@/components/modules/features/staking/StakingForm";
import BackButton from "@/components/ui/buttons/BackButton";

export default function StakingPage() {
  return (
    <div className="staking-page">
      <h1>Stake TNTT Tokens</h1>
      <StakingForm />
      <BackButton />
    </div>
  );
}