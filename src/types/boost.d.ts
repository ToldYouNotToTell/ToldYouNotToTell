// src/types/boost.d.ts
export type BoostTier = {
  id: number;
  name: "Basic" | "Start+" | "Advanced" | "Premium" | "Elite" | "GodMode";
  amount: number;
  color: string;
  emoji: "🌱" | "🐻" | "🐰" | "🐬" | "💎" | "👑";
  duration?: number; 
};
