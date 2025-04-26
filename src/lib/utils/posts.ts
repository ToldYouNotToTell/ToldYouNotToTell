import { Post, Comment } from "@/types/post";

const BoostTiers: Record<number, { decay: number }> = {
  5: { decay: 0.3 },
  10: { decay: 0.25 },
  30: { decay: 0.15 },
  50: { decay: 0.1 },
  100: { decay: 0.05 },
  250: { decay: 0.02 }
};

export function initializeDefaultPosts(): Post[] {
  const randomIPs = Array(25)
    .fill('') // Исправлено .fill() -> .fill('')
    .map(() =>
      `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    );

  const randomDate = (start: Date, end: Date): string =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

  const randomComments = (authorIds: string[]): Comment[] => {
    const comments = [
      {
        id: crypto.randomUUID(),
        text: "Wow, this really hits home...",
        authorId: authorIds[0],
        date: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        text: "Haha, I can totally picture this...",
        authorId: authorIds[1],
        date: new Date().toISOString()
      }
    ];
    return comments.slice(0, Math.floor(Math.random() * 4));
  };

  const posts: Post[] = [
    {
      id: crypto.randomUUID(),
      title: "I've never gone on a date sober",
      content: "I always have a drink beforehand...",
      voters: [],
      date: randomDate(new Date(2025, 3, 12), new Date(2025, 3, 15)),
      comments: randomComments(randomIPs), // Исправлено: передаем массив authorIds
      orderNumber: 1,
      authorId: randomIPs[0], // Исправлено authorIP -> authorId
      category: "Dating"
    }
  ];

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function sortPosts(posts: Post[], type: string): Post[] {
  switch (type) {
    case "new":
      return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case "top":
      return [...posts].sort((a, b) => (b.voters?.length || 0) - (a.voters?.length || 0));
    case "random":
      return [...posts].sort(() => Math.random() - 0.5);
    case "trending":
      return sortTrendingPosts(posts);
    default:
      return posts;
  }
}

function sortTrendingPosts(posts: Post[]): Post[] {
  const now = Date.now();
  return posts
    .map((post) => ({
      ...post,
      boostWeight: post.boostAmount
        ? calculateBoostWeight(post.boostAmount, post.boostTime || now)
        : 0,
    }))
    .sort((a, b) => {
      if (a.boostWeight !== b.boostWeight) {
        return b.boostWeight - a.boostWeight;
      }
      return (b.voters?.length || 0) - (a.voters?.length || 0);
    });
}

function calculateBoostWeight(amount: number, time: number): number {
  const hoursPassed = (Date.now() - time) / 3600000;
  const decay = BoostTiers[amount]?.decay || 0.3;
  return Math.max(0, amount * Math.pow(1 - decay, hoursPassed));
}