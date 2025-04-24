"use client";
import React from "react";
import { closeReportsPanel } from "@/lib/uiActions";

export default function CloseReportsPanelButton() {
  return (
<button
  type="button"
  onClick={() => closeReportsPanel()}
  className="close-reports-btn"
  aria-label="Close reports panel"
>
  <i className="fas fa-times"></i>
</button>
  );
}