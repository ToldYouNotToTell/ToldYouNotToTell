"use client";
import React from "react";
import { downloadRecoveryCode } from "@/lib/uiActions";

export default function DownloadRecoveryCodeButton() {
  return (
    <button type="button" onClick={() => downloadRecoveryCode()}>
      <i className="fas fa-download"></i> Download
    </button>
  );
}
