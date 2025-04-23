import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { ThemeProvider } from '@/contexts/ThemeContext';
import PostsProvider from '@/contexts/PostsContext';
import Web3Provider from '@/contexts/Web3Context';
import { UniversalStorage } from '@/lib/api/universalStorage';
import '@/styles/globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <html lang="en">
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <ThemeProvider>
                <Web3Provider>
                  <PostsProvider>
                    {children}
                  </PostsProvider>
                </Web3Provider>
              </ThemeProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}