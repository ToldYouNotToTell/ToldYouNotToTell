// src/app/layout.tsx
'use client';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from "@solana/web3.js";
import { Web3Provider } from '@/contexts/Web3Context';
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from "react";
import { hidePresaleModal } from '@/lib/uiActions';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Web3Provider>
                {children}
                
                {/* Модальное окно Presale */}
                <div 
                  id="presaleModal"
                  style={{
                    display: 'none',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                  }}
                  onClick={hidePresaleModal}
                >
                  <div 
                    style={{
                      background: 'white',
                      padding: '30px',
                      borderRadius: '15px',
                      maxWidth: '500px',
                      width: '90%',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 style={{ 
                      marginTop: 0, 
                      color: '#6e45ff',
                      fontSize: '24px'
                    }}>
                      Token Presale Coming Soon
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
                      Our token sale will be available on <strong>solsale.app</strong> during the Fair Launch event.
                    </p>
                    <p style={{ 
                      marginTop: '15px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      Check back later for updates!
                    </p>
                    
                    <button 
                      onClick={hidePresaleModal}
                      style={{
                        padding: '10px 20px',
                        background: '#6e45ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginTop: '25px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background 0.3s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#5a35d9'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#6e45ff'}
                    >
                      Got It!
                    </button>
                  </div>
                </div>
              </Web3Provider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}