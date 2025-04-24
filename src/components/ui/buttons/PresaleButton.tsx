'use client';
import React from 'react';
import { showPresaleModal } from '@/lib/uiActions';

export default function PresaleButton() {
  return (
    <button className="presale-btn" onClick={() => showPresaleModal()}>
      <i className="fas fa-coins"></i> Presale
    </button>
  );
}