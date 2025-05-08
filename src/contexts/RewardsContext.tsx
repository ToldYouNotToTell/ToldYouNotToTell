"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

import { db } from "@/lib/firebase";

type RewardsContextType = {
  poolAmount: number;
  stakingAPY: number;
  lastDistribution: Date | null;
};

const RewardsContext = createContext<RewardsContextType>({
  poolAmount: 0,
  stakingAPY: 0,
  lastDistribution: null,
});

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<RewardsContextType>({
    poolAmount: 0,
    stakingAPY: 8.3, // Default APY
    lastDistribution: null,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "rewards/pool"), (doc) => {
      const poolData = doc.data();
      setData((prev) => ({
        ...prev,
        poolAmount: poolData?.amount || 0,
        lastDistribution: poolData?.lastDistributed?.toDate() || null,
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <RewardsContext.Provider value={data}>{children}</RewardsContext.Provider>
  );
}

export const useRewards = () => useContext(RewardsContext);
