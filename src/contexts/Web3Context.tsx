// src/contexts/Web3Context.tsx
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
import html2canvas from "html2canvas";

export interface Web3ContextType {
  /** Запрос на подключение кошелька */
  connectWallet: () => Promise<void>;
  /** Отключение кошелька */
  disconnectWallet: () => void;
  /** Публичный ключ (null, если не подключены) */
  publicKey: PublicKey | null;
  /** true, если кошелёк подключён */
  isConnected: boolean;
  /** Универсальное хранилище */
  storage: UniversalStorage;
  /** Захват скриншота DOM-элемента */
  captureScreenshot: (element: HTMLElement, filename: string) => Promise<void>;
  /** Сохранение текстового файла */
  downloadTextFile: (filename: string, content: string) => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [storage] = useState(new UniversalStorage());
  const [wallet] = useState(new PhantomWalletAdapter());

  useEffect(() => {
    wallet.on("connect", (pubkey: PublicKey) => {
      setPublicKey(pubkey);
      setConnection(new Connection(clusterApiUrl("mainnet-beta"), "confirmed"));
    });
    wallet.on("disconnect", () => {
      setPublicKey(null);
      setConnection(null);
    });
    return () => {
      wallet.disconnect();
    };
  }, [wallet]);

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
  if (!context) {
    throw new Error("useWeb3 must be used within Web3Provider");
  }
  return context;
}