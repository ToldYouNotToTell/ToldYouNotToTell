"use client";
import React from "react";
import { payWithUSDT } from "@/lib/uiActions";

export default function PayWithUSDTButton() {
  return (
    <button className="pay-with-usdt" onClick={() => payWithUSDT()}>
      <i className="fas fa-wallet"></i> Pay with USDT
    </button>
  );
}
