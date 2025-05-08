// src/hooks/useWallet.ts
import { PublicKey } from "@solana/web3.js";
import { useCallback, useState } from "react";

import { useWeb3 } from "@/contexts/Web3Context";

interface BoostData {
  postId: string | null;
}

export interface WalletActions {
  isConnected: boolean;
  address: string | null;
  shortAddress: string | null;
  publicKey: PublicKey | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  boostPost: (postId: string) => void;
  showPresaleModal: boolean;
  setShowPresaleModal: (show: boolean) => void;
  participatePresale: (amount: number) => Promise<void>;
  currentBoost: BoostData;
}

export const useWallet = (): WalletActions => {
  const {
    connectWallet: contextConnect,
    disconnectWallet: contextDisconnect,
    walletAddress,
    publicKey,
    isConnected,
  } = useWeb3();

  const [showPresaleModal, setShowPresaleModal] = useState(false);
  const [boostData, setBoostData] = useState<BoostData>({
    postId: null,
  });

  const connect = useCallback(async () => {
    try {
      await contextConnect();
    } catch (error) {
      console.error("Connection failed:", error);
      throw error;
    }
  }, [contextConnect]);

  const disconnect = useCallback(async () => {
    try {
      await contextDisconnect();
    } catch (error) {
      console.error("Disconnection failed:", error);
      throw error;
    }
  }, [contextDisconnect]);

  const handleBoost = (postId: string) => {
    if (!isConnected) return;
    setBoostData({ postId });
  };

  const handlePresale = async (_amount: number) => {
    if (!isConnected) throw new Error("Wallet not connected");
    try {
      // Здесь должна быть реализация транзакции для участия в предпродаже
    } finally {
      setShowPresaleModal(false);
    }
  };

  return {
    isConnected,
    address: walletAddress,
    shortAddress: walletAddress
      ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
      : null,
    publicKey,
    connect,
    disconnect,
    boostPost: handleBoost,
    showPresaleModal,
    setShowPresaleModal,
    participatePresale: handlePresale,
    currentBoost: boostData,
  };
};
