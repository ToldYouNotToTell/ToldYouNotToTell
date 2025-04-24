"use client";
import React from "react";
import { closeScreenshot } from "@/lib/uiActions";

export default function CloseScreenshotButton() {
  return (
    <button className="close-screenshot" onClick={() => closeScreenshot()}>
      &times;
    </button>
  );
}
