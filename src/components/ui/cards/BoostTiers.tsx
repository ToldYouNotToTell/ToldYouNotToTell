"use client";

import { BOOST_TIERS } from "@/lib/utils/boost";

export default function BoostTiers() {
  return (
    <table className="boost-table">
      <thead>
        <tr>
          <th>Tier</th>
          <th>Price</th>
          <th>Badge</th>
          <th>Trending Time</th>
          <th>Priority Decay</th>
          <th>Perks</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(BOOST_TIERS).map(([amount, tier]) => (
          <tr key={amount}>
            <td>{tier.name}</td>
            <td>${amount}</td>
            <td className="boost-badge">{tier.icon}</td>
            <td>{tier.max} hours</td>
            <td>-{tier.decay * 100}%</td>
            <td>{getTierPerks(Number(amount))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function getTierPerks(amount: number) {
  switch (amount) {
    case 5:
      return "Above all free posts";
    case 10:
      return "Longer visibility retention";
    case 30:
      return "High rotation priority";
    case 50:
      return "Stable promotion";
    case 100:
      return "Higher position in Trending";
    case 250:
      return "Maximum reach";
    default:
      return "";
  }
}
