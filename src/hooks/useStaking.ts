// src/hooks/useStaking.ts
'use client';

export const useStaking = () => {
  const stakeTokens = async (amount: number) => {
    console.log('Staking:', amount, 'TNTT');
    // Заглушка - замените на реальную логику позже
    return Promise.resolve();
  };

  return { stakeTokens };
};