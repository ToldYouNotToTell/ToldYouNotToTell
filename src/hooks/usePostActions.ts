import { useWeb3 } from "./useWeb3";
import { getUserIP } from "../lib/utils/recovery";

export const usePostActions = (post: any) => {
  const { walletAddress } = useWeb3();
  const userIP = getUserIP();

  const isAuthor = walletAddress
    ? post.authorWallet === walletAddress
    : post.authorIP === userIP;

  const timeLeft = getTimeLeftForEdit(post.date);

  return { isAuthor, timeLeft };
};

const getTimeLeftForEdit = (postDate: Date) => {
  // ... реализация из вашего кода
};
