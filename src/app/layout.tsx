"use client";
import "./globals.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import Head from "next/head";
import { ReactNode, useState, useEffect, useMemo } from "react";

import Header from "@/components/header/Header";
import SortBar from "@/components/posts/SortControls";
import { PostsProvider } from "@/contexts/PostsContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Web3Provider } from "@/contexts/Web3Context"; // Ваш кастомный провайдер

// Solana-зависимости

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const NETWORK = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(NETWORK), [NETWORK]);

  const wallets = useMemo(() => {
    if (typeof window === "undefined") return [];
    return []; 
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <html lang="ru">
        <body className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="text-white">Loading…</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="ru">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <ThemeProvider>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={false}>
              <WalletModalProvider>
                <Web3Provider>
                  {" "}
                  {/* Ваш кастомный провайдер */}
                  <PostsProvider>
                    <Header />
                    <SortBar />
                    {children}
                  </PostsProvider>
                </Web3Provider>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}