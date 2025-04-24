"use client";
import React from "react";
import { showStakingPage } from "@/lib/uiActions";

export default function StakeButton() {
  return (
    <button className="stake-btn" onClick={() => showStakingPage()}>
      <i className="fas fa-lock"></i> Stake TNTT
    </button>
  );
}
