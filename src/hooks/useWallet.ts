import { useState } from 'react';
import { useWeb3 } from "@/contexts/Web3Context";

export const useWallet = () => {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useWeb3();
  const [showPresaleModal, setShowPresaleModal] = useState(false);
  const [boostData, setBoostData] = useState<{
    postId: number | null;
    amount: number;
  }>({ postId: null, amount: 0 });

  const handleBoost = (postId: number, amount: number) => {
    if (!isConnected) return;
    setBoostData({ postId, amount });
    // Логика буста через контракт
  };

  const handlePresale = (amount: number) => {
    if (!isConnected) return;
    // Логика пресейла
    setShowPresaleModal(false);
  };

  return {
    isConnected,
    address: walletAddress,
    shortAddress: walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : null,
    connect: connectWallet,
    disconnect: disconnectWallet,
    boostPost: handleBoost,
    showPresaleModal,
    setShowPresaleModal,
    participatePresale: handlePresale,
    currentBoost: boostData
  };
};

export default useWallet;