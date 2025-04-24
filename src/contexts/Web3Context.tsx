"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { UniversalStorage } from "@/lib/api/universalStorage";

interface Web3ContextType {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  publicKey: PublicKey | null;
  isConnected: boolean;
  storage: UniversalStorage;
  captureScreenshot: (element: HTMLElement, filename: string) => Promise<void>;
  downloadTextFile: (filename: string, content: string) => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [storage] = useState(new UniversalStorage());
  const [wallet] = useState(new PhantomWalletAdapter());

  useEffect(() => {
    wallet.on("connect", (publicKey: PublicKey) => {
      setPublicKey(publicKey);
      setConnection(new Connection(clusterApiUrl("mainnet-beta"), "confirmed"));
    });

    wallet.on("disconnect", () => {
      setPublicKey(null);
      setConnection(null);
    });

    return () => {
      wallet.disconnect();
    };
  }, []);

  const connectWallet = async () => {
    try {
      await wallet.connect();
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const disconnectWallet = async () => {
    await wallet.disconnect();
  };

  const captureScreenshot = async (element: HTMLElement, filename: string) => {
    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadTextFile = (filename: string, content: string) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        disconnectWallet,
        publicKey,
        isConnected: !!publicKey,
        storage,
        captureScreenshot,
        downloadTextFile,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}
