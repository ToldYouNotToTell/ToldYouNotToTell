import BoostTiers from "@/components/ui/cards/BoostTiers";
import BackButton from "@/components/ui/buttons/BackButton";

export default function PromotionPage() {
  return (
    <div className="promotion-page">
      <h1>Boosting and Trending System</h1>
      <p>Users can promote their posts by paying fixed amounts in USDT...</p>
      <BoostTiers />
      <BackButton />
    </div>
  );
}