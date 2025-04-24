"use client";
import React from "react";
import { closeReportsPanel } from "@/lib/uiActions";

export default function CloseReportsPanelButton() {
  return (
    <button
      onClick={() => closeReportsPanel()}
      style={{
        background: "none",
        border: "none",
        color: "var(--icon-color)",
        cursor: "pointer",
      }}
    >
      <i className="fas fa-times"></i>
    </button>
  );
}
