import { Post } from "@/types/post";

export function initializeDefaultPosts(): Post[] {
  const randomIPs = Array(25)
    .fill()
    .map(
      () =>
        `${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}.${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}`
    );

  const randomDate = (start: Date, end: Date) =>
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

  const randomComments = () => {
    const comments = [
      "Wow, this really hits home...",
      "Haha, I can totally picture this...",
      // ... другие комментарии
    ];
    return comments.slice(0, Math.floor(Math.random() * 4));
  };

  const posts: Post[] = [
    {
      id: 1,
      title: "I've never gone on a date sober",
      content: "I always have a drink beforehand...",
      voters: [],
      date: randomDate(new Date(2025, 3, 12), new Date(2025, 3, 15)),
      comments: randomComments(),
      orderNumber: 1,
      authorIP: randomIPs[0],
      category: "Dating",
    },
    // ... другие тестовые посты
  ];

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function sortPosts(posts: Post[], type: string): Post[] {
  switch (type) {
    case "new":
      return [...posts].sort((a, b) => b.date.getTime() - a.date.getTime());
    case "top":
      return [...posts].sort(
        (a, b) => (b.voters?.length || 0) - (a.voters?.length || 0)
      );
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