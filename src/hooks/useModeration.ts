"use client";

import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useWeb3 } from "./useWeb3";
import { toast } from "sonner";

export const useModeration = () => {
  const { walletAddress } = useWeb3();

  const reportPost = async (postId: string) => {
    try {
      await setDoc(doc(db, "reports", `${postId}_${Date.now()}`), {
        postId,
        reporter: walletAddress || "anonymous",
        createdAt: new Date(),
      });
      toast.success("Post reported successfully");
    } catch (error) {
      toast.error("Failed to report post");
    }
  };

  return { reportPost };
};
