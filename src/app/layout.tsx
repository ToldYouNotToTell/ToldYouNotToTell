// src/app/layout.tsx
'use client';

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from "react";
import { PostsProvider } from '../contexts/PostsContext';
import './globals.css'; // Этот импорт теперь будет работать

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ... остальной код без изменений
}