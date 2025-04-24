'use client';
import React from 'react';
import { copyRecoveryCode } from '@/lib/uiActions';

export default function CopyRecoveryCodeButton() {
  return (
    <button className="copy-code" onClick={() => copyRecoveryCode()} title="Copy code">
      <i className="far fa-copy"></i>
    </button>
  );
}