// src/hooks/useStaking.ts
"use client";

export const useStaking = () => {
  const stakeTokens = async (_amount: number) => {
    //*fake
    // Реальная логика будет добавлена позже
    return Promise.resolve();
  };

  return { stakeTokens };
};
