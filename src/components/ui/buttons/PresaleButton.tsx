// src/components/buttons/PresaleButton.tsx
'use client';
import React from 'react';
import { showPresaleModal } from '@/lib/uiActions';

export default function PresaleButton() {
  return (
    <button 
      className="presale-btn" 
      onClick={showPresaleModal}
      style={{
        padding: '10px 20px',
        background: '#6e45ff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      <i className="fas fa-coins" style={{ marginRight: '8px' }}></i> 
      Presale
    </button>
  );
}