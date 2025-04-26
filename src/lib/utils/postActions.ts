import { Post } from "@/types/post";
import { generateRecoveryCode } from "@/lib/utils/recovery";

export function canEditPost(
  post: Post,
  userIP: string,
  walletAddress?: string
): boolean {
  const isAuthor = walletAddress
    ? post.authorWallet === walletAddress
    : post.authorId === userIP;

  const threeHours = 3 * 60 * 60 * 1000;
  const timePassed = Date.now() - new Date(post.date).getTime();

  return isAuthor && timePassed <= threeHours;
}

export function initializeNewPost(
  title: string,
  content: string,
  category: string,
  userIP: string,
  walletAddress?: string
): { post: Post; recoveryCode: string } {
  const recoveryCode = generateRecoveryCode();

  const post: Post = {
    id: crypto.randomUUID(),
    title,
    content,
    category,
    voters: [],
    date: new Date().toISOString(),
    comments: [],
    orderNumber: 0,
    authorId: walletAddress ? undefined : userIP,
    authorWallet: walletAddress || undefined,
  };

  return { post, recoveryCode };
}