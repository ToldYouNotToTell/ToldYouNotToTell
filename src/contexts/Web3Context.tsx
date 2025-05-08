"use client";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

export interface Web3ContextType {
  walletAddress: string | null;
  publicKey: PublicKey | null;
  isConnected: boolean;
  connectWallet: () => Promise<string>;
  disconnectWallet: () => Promise<string>;
  connection: Connection;
  isPhantomAvailable: boolean;
}

export const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const connection = useMemo(() => new Connection(clusterApiUrl("devnet")), []);

  const isPhantomAvailable = useMemo(
    () => typeof window !== "undefined" && !!window.solana?.isPhantom,
    []
  );

  const connectWallet = useCallback(async (): Promise<string> => {
    if (typeof window === "undefined") {
      return "Wallet connection is not available on server-side";
    }

    if (!isPhantomAvailable) {
      window.open("https://phantom.app/", "_blank");
      return "Phantom Wallet not installed";
    }

    try {
      const response = await window.solana!.connect();
      const pubKey = response.publicKey;
      setWalletAddress(pubKey.toString());
      setPublicKey(pubKey);
      return "Connected successfully";
    } catch (error) {
      return error instanceof Error ? error.message : "Connection failed";
    }
  }, [isPhantomAvailable]);

  const disconnectWallet = useCallback(async (): Promise<string> => {
    if (typeof window === "undefined") {
      return "Wallet disconnection is not available on server-side";
    }

    if (!isPhantomAvailable || !walletAddress) {
      return "Wallet not connected";
    }

    try {
      await window.solana!.disconnect();
      setWalletAddress(null);
      setPublicKey(null);
      return "Disconnected successfully";
    } catch (error) {
      return error instanceof Error ? error.message : "Disconnection failed";
    }
  }, [isPhantomAvailable, walletAddress]);

  useEffect(() => {
    if (typeof window === "undefined" || !isPhantomAvailable) return;

    const handleConnect = ({ publicKey }: { publicKey: PublicKey }) => {
      setWalletAddress(publicKey?.toString() || null);
      setPublicKey(publicKey || null);
    };

    const handleAutoConnect = async () => {
      try {
        const response = await window.solana!.connect({ onlyIfTrusted: true });
        handleConnect(response);
      } catch {
        // Автоподключение не обязательно
      }
    };

    handleAutoConnect();
    window.solana!.on("connect", handleConnect);

    return () => {
      window.solana?.off("connect", handleConnect);
    };
  }, [isPhantomAvailable]);

  const value = useMemo(
    () => ({
      walletAddress,
      publicKey,
      isConnected: !!walletAddress,
      connectWallet,
      disconnectWallet,
      connection,
      isPhantomAvailable,
    }),
    [walletAddress, publicKey, connectWallet, disconnectWallet, connection, isPhantomAvailable]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within Web3Provider");
  }
  return context;
};