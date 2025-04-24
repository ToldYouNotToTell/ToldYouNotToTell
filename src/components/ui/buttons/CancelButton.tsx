"use client";
import React from "react";
import { toggleForm } from "@/lib/uiActions";

export default function CancelButton() {
  return (
    <button type="button" onClick={() => toggleForm()}>
      Cancel
    </button>
  );
}
