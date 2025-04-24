'use client';
import React from 'react';
import { closeRecoveryModal } from '@/lib/uiActions';

export default function CloseRecoveryModalButton() {
  return (
    <button type="button" onClick={() => closeRecoveryModal()}>
      Close
    </button>
  );
}