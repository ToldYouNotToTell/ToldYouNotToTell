// src/types/rewards.d.ts

/**
 * Периодичность распределения наград
 */
export type RewardPeriod = "daily" | "weekly" | "monthly";

/**
 * Условия участия в розыгрыше наград
 */
export interface RewardEligibility {
  /** Минимальное количество токенов, которое должен держать пользователь */
  minimumTokens: number; // e.g. 10000
  /** Период, за который начисляются награды */
  period: RewardPeriod; // пока – 'daily'
}

/**
 * Как формируется пул наград
 */
export interface RewardSources {
  /** Процент от налогов на транзакции (buy/sell) */
  tokenTaxPercent: number; // e.g. 50
  /** Процент от выделений из токеномики */
  tokenomicsPercent: number; // e.g. 15
}

/**
 * На что тратится пул наград
 */
export interface RewardDistribution {
  /** 50% → топ-10 постов (по 5% каждому) */
  topPostsPercent: number; // 50
  /** 20% → сжигание токенов */
  tokenBurnPercent: number; // 20
  /** 10% → команда проекта */
  teamPercent: number; // 10
  /** 15% → пул стейкинга */
  stakingPoolPercent: number; // 15
  /** 5% → казна (treasury) */
  treasuryPercent: number; // 5
}

/**
 * Элемент структуры распределения, который рендерится в RewardsCard
 */
export interface DistributionItem {
  /** Название пункта (например, "Top Posts") */
  label: string;
  /** Процент от общего пула (например, 5) */
  percent: number;
  /** Опциональное описание пункта */
  description?: string;
}

/**
 * Общая конфигурация системы наград
 */
export interface RewardConfig {
  eligibility: RewardEligibility;
  sources: RewardSources;
  distribution: RewardDistribution;
}

/**
 * Запись об выигрышном посте
 */
export interface RewardWinner {
  /** Идентификатор поста */
  postId: string;
  /** Сумма вознаграждения в TYNT */
  rewardAmount: number;
  /** Место в топ-10 (1–10) */
  rank: number;
  /** Время распределения */
  distributedAt: Date;
}
