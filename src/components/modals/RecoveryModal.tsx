'use client';

import { useState } from 'react';

export default function RecoveryModal({ 
  code,
  onClose
}: {
  code: string;
  onClose: () => void;
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="recovery-code-modal">
      <h2>Save this recovery code</h2>
      <div className="recovery-code">
        {code}
        <button onClick={copyToClipboard}>
          <i className="far fa-copy"></i>
        </button>
      </div>
      <div className="form-actions">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}