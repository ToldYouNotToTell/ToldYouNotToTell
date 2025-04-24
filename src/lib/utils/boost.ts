export const BOOST_TIERS = {
  5: { decay: 0.3, min: 0, max: 5, name: "Basic", icon: "🌱" },
  10: { decay: 0.25, min: 5, max: 10, name: "Start+", icon: "🧸" },
  30: { decay: 0.15, min: 10, max: 30, name: "Advanced", icon: "🐇" },
  50: { decay: 0.1, min: 30, max: 50, name: "Premium", icon: "🐬" },
  100: { decay: 0.05, min: 50, max: 100, name: "Elite", icon: "💎" },
  250: { decay: 0.02, min: 100, max: Infinity, name: "Sponsor", icon: "👑" },
};

export function calculateBoostWeight(boostAmount: number, boostTime: number) {
  const now = Date.now();
  const hoursPassed = (now - boostTime) / 3600000;
  const decay = BOOST_TIERS[boostAmount]?.decay || 0.3;
  return Math.max(0, boostAmount * Math.pow(1 - decay, hoursPassed));
}
