// src/lib/boostConfig.ts
import type { BoostTier } from "@/types/post";

export const BOOST_TIERS: BoostTier[] = [
  {
    id: 1,
    name: "Basic",
    amount: 5,
    color: "#6e42ca",
    emoji: "🌱", // Росток
  },
  {
    id: 2,
    name: "Start+",
    amount: 10,
    color: "#ff6b35",
    emoji: "🐻", // Мишка
  },
  {
    id: 3,
    name: "Advanced",
    amount: 30,
    color: "#00b4d8",
    emoji: "🐰", // Зайчик
  },
  {
    id: 4,
    name: "Premium",
    amount: 50,
    color: "#ff9f1c",
    emoji: "🐬", // Дельфинчик
  },
  {
    id: 5,
    name: "Elite",
    amount: 100,
    color: "#10b981",
    emoji: "💎", // Алмаз
  },
  {
    id: 6,
    name: "GodMode",
    amount: 250,
    color: "#8b5cf6",
    emoji: "👑", // Корона
  },
];
