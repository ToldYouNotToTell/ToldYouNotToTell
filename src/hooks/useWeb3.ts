// src/hooks/useWeb3.ts
import { useContext } from "react";

import { Web3Context } from "@/contexts/Web3Context";
import type { Web3ContextType } from "@/contexts/Web3Context"; // Импорт типа из контекста

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
