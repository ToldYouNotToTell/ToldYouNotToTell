'use client';

import { useState } from 'react';
import { useWeb3 } from '@/hooks/useWeb3';

export default function PresaleModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState(10);
  const { connectWallet, isConnected } = useWeb3();

  const handleParticipate = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    // Логика участия в пресейле
    console.log(`Participating in presale with ${amount} USDT`);
    onClose();
  };

  return (
    <div className="presale-modal">
      <button className="close-screenshot" onClick={onClose}>&times;</button>
      <h2><i className="fas fa-coins"></i> TNTT Presale</h2>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <p>Participate in our token presale to get early access to TNTT tokens!</p>
        <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '15px 0', color: 'var(--primary-color)' }}>
          1 USDT = 100 TNTT
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Amount (USDT):</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            step="1"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              background: 'var(--search-bg)',
              color: 'var(--text-color)'
            }}
          />
        </div>
        <button 
          onClick={handleParticipate}
          style={{
            width: '100%',
            padding: '10px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <i className="fas fa-wallet"></i> Buy with USDT
        </button>
      </div>
    </div>
  );
}