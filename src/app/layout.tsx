// src/app/layout.tsx
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from "@solana/web3.js";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PostsProvider } from "@/contexts/PostsContext";
import { StakingProvider } from "@/contexts/StakingContext";
import { RewardsProvider } from "@/contexts/RewardsContext";
import { FirebaseProvider } from "@/components/FirebaseProvider";
import { SEO } from "@/components/SEO";
import Header from "@/components/header/Header";
import BackToTopButton from "@/components/ui/buttons/BackToTopButton";
import "@/styles/globals.css";
import "@/styles/theme.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <SEO />
      </head>
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <FirebaseProvider>
                <Web3Provider>
                  <ThemeProvider>
                    <StakingProvider>
                      <RewardsProvider>
                        <PostsProvider>
                          <Header />
                          <main>{children}</main>
                          <BackToTopButton />
                        </PostsProvider>
                      </RewardsProvider>
                    </StakingProvider>
                  </ThemeProvider>
                </Web3Provider>
              </FirebaseProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}