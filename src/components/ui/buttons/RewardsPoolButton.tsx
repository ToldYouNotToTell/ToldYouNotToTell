"use client";
import React from "react";
import { showRewardsPage } from "@/lib/uiActions";

export default function RewardsPoolButton() {
  return (
    <button
      className="rewards-pool-btn"
      onClick={() => showRewardsPage()}
      title="Rewards Pool"
    >
      💎
      <span className="tooltip-text" id="rewardsTooltip">
        Loading rewards info...
      </span>
    </button>
  );
}
