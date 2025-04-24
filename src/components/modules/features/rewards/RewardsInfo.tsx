"use client";

import { useEffect, useState } from "react";

export default function RewardsInfo() {
  const [rewardsData, setRewardsData] = useState({
    pool: 1000,
    nextDistribution: "",
    distribution: {
      topPosts: 50,
      burn: 20,
      team: 10,
      staking: 15,
      treasury: 5,
    },
  });

  useEffect(() => {
    // Расчет времени до следующей раздачи
    const now = new Date();
    const next = new Date(now);
    next.setDate(next.getDate() + 1);
    next.setHours(0, 0, 0, 0);

    const diff = next.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setRewardsData((prev) => ({
      ...prev,
      nextDistribution: `${hours}h ${minutes}m`,
    }));
  }, []);

  return (
    <div id="rewardsContent">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3>Next Reward Distribution</h3>
        <p>{rewardsData.nextDistribution} remaining</p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h3>Current Rewards Pool</h3>
        <p>{rewardsData.pool} TNTT</p>
      </div>
      <div>
        <h3>Distribution Structure</h3>
        <ul>
          <li>Top 10 Posts: {rewardsData.distribution.topPosts}%</li>
          <li>Token Burn: {rewardsData.distribution.burn}%</li>
          <li>Team: {rewardsData.distribution.team}%</li>
          <li>Staking Pool: {rewardsData.distribution.staking}%</li>
          <li>Treasury: {rewardsData.distribution.treasury}%</li>
        </ul>
      </div>
      <button
        onClick={() => alert("Rewards would be claimed here")}
        style={{
          width: "100%",
          padding: "10px",
          background: "var(--primary-color)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Claim Rewards
      </button>
    </div>
  );
}