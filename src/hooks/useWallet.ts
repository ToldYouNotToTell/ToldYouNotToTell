// src/hooks/useWallet.ts
import { useWeb3 } from "@/contexts/Web3Context";

export const useWallet = () => {
  const { publicKey, isConnected, connectWallet, disconnectWallet } = useWeb3();

  return {
    /** Флаг подключённости */
    isConnected,
    /** Адрес кошелька в виде строки или null */
    address: publicKey?.toString() ?? null,
    /** Функция подключения */
    connect: connectWallet,
    /** Функция отключения */
    disconnect: disconnectWallet,
  };
};