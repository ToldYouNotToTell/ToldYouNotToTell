// src/lib/utils/boost.ts

/**
 * Описание одного уровня буста
 */
export interface BoostTier {
  /** Человеко-читаемое имя уровня */
  name: string
  /** Минимальный вес (USD), при котором пост попадает в этот уровень (exclusive) */
  minWeight: number
  /** Максимальный вес (USD), до которого действует уровень (inclusive) */
  maxWeight: number
  /** Почасовая ставка убыли (decay rate), например 0.05 = 5%/час */
  decayRate: number
  /** Интервал ротации внутри уровня (в минутах) */
  rotationIntervalMinutes: number
  /**
   * Диапазон позиций в Trending:
   * [start, end], или null для органической секции
   */
  trendingPositionRange: [number, number] | null
}

/**
 * Все уровни буста в порядке убывания minWeight.
 * Базируется на документе "Final Boosting Algorithm with Decay and Category Shifts"
 */
export const boostTiers: BoostTier[] = [
  {
    name: 'Sponsor',
    minWeight: 100,
    maxWeight: Infinity,
    decayRate: 0.02,
    rotationIntervalMinutes: 15,
    trendingPositionRange: [1, 10],
  },
  {
    name: 'Elite',
    minWeight: 50,
    maxWeight: 100,
    decayRate: 0.05,
    rotationIntervalMinutes: 15,
    trendingPositionRange: [11, 20],
  },
  {
    name: 'Premium',
    minWeight: 30,
    maxWeight: 50,
    decayRate: 0.1,
    rotationIntervalMinutes: 15,
    trendingPositionRange: [21, 40],
  },
  {
    name: 'Advanced',
    minWeight: 10,
    maxWeight: 30,
    decayRate: 0.15,
    rotationIntervalMinutes: 15,
    trendingPositionRange: [41, 60],
  },
  {
    name: 'Start+',
    minWeight: 5,
    maxWeight: 10,
    decayRate: 0.25,
    rotationIntervalMinutes: 15,
    trendingPositionRange: [61, 80],
  },
  {
    name: 'Basic',
    minWeight: 0,
    maxWeight: 5,
    decayRate: 0.3,
    rotationIntervalMinutes: 15,
    trendingPositionRange: [81, 100],
  },
]

/**
 * Находит BoostTier по сумме оплаты.
 * Если amount ≤ 0 или не попадает в диапазоны — возвращает null (органическая секция).
 */
export function getBoostTier(amount: number): BoostTier | null {
  if (amount <= 0) return null
  return boostTiers.find(t => amount > t.minWeight && amount <= t.maxWeight) ?? null
}

/**
 * Рассчитывает текущий "вес" буста с учётом почасового затухания.
 *
 * Формула: currentWeight = initialAmount × (1 − decayRate)^(hoursPassed)
 *
 * @param boostAmount — изначальная сумма оплаты (USD)
 * @param boostTime — метка времени (ms), когда был куплен буст
 * @returns остаточный вес буста (>= 0)
 */
export function calculateBoostWeight(
  boostAmount: number,
  boostTime: number
): number {
  const tier = getBoostTier(boostAmount)
  const decay = tier?.decayRate ?? 0
  const hoursPassed = (Date.now() - boostTime) / (1000 * 60 * 60)
  const weight = boostAmount * Math.pow(1 - decay, hoursPassed)
  return Math.max(0, weight)
}