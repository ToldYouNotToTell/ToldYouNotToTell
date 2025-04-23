import { useEffect, useState } from "react";
import { Web3ContextType } from "@/contexts/Web3Context";

export const useWallet = () => {
  const [walletState, setWalletState] = useState<Web3ContextType>({
    isConnected: false,
    address: null,
    connect: async () => {},
    disconnect: () => {},
  });

  useEffect(() => {
    const checkConnection = async () => {
      if (window.solana?.isConnected) {
        setWalletState({
          isConnected: true,
          address: window.solana.publicKey.toString(),
          connect: async () => {},
          disconnect: () => window.solana.disconnect(),
        });
      }
    };
    checkConnection();
  }, []);

  return walletState;
};