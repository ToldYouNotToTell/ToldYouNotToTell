import { Post, Comment } from "@/types/post";

interface BoostTier {
  decay: number;
}

const BoostTiers: Record<number, BoostTier> = {
  1: { decay: 0.1 },
  2: { decay: 0.2 },
  3: { decay: 0.3 },
};

const createComment = (text: string): Comment => ({
  id: Math.random().toString(36).substring(2, 9),
  text,
  authorId: `user-${Math.floor(Math.random() * 1000)}`,
  date: new Date().toISOString()
});

export function initializeDefaultPosts(): Post[] {
  const randomAuthorIds = Array(25)
    .fill(null)
    .map(() => `user-${Math.floor(Math.random() * 10000)}`);

  const randomDate = (start: Date, end: Date): string => {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toISOString();
  };

  const randomComments = (): Comment[] => {
    const possibleComments = [
      "Wow, this really hits home...",
      "Haha, I can totally picture this...",
      "Interesting perspective!",
      "I disagree with this.",
      "This made my day!"
    ];
    
    return possibleComments
      .slice(0, Math.floor(Math.random() * possibleComments.length))
      .map(text => createComment(text));
  };

  const posts: Post[] = [
    {
      id: "1",
      title: "I've never gone on a date sober",
      content: "I always have a drink beforehand...",
      voters: [],
      date: randomDate(new Date(2025, 3, 12), new Date(2025, 3, 15)),
      comments: randomComments(),
      orderNumber: 1,
      authorId: randomAuthorIds[0],
      category: "Dating",
      boostAmount: 0,
      boostTime: Date.now(),
    },
    {
      id: "2",
      title: "Why I quit social media",
      content: "After 5 years, I finally deleted all my accounts...",
      voters: [],
      date: randomDate(new Date(2025, 2, 1), new Date(2025, 3, 10)),
      comments: randomComments(),
      orderNumber: 2,
      authorId: randomAuthorIds[1],
      category: "Life",
      boostAmount: 0,
      boostTime: Date.now(),
    }
  ];

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Заглушки для новых экспортируемых функций
export async function fetchPosts(): Promise<Post[]> {
  // Реализация получения постов с сервера
  return [];
}

export async function createPost(newPost: Omit<Post, 'id'>): Promise<Post> {
  // Реализация создания поста
  return { ...newPost, id: Math.random().toString() };
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post> {
  // Реализация обновления поста
  return { ...updates, id } as Post;
}

export async function deletePostById(id: string): Promise<void> {
  // Реализация удаления поста
}

export async function addComment(postId: string, comment: Omit<Comment, 'id' | 'date'>): Promise<Comment> {
  // Реализация добавления комментария
  return {
    ...comment,
    id: Math.random().toString(),
    date: new Date().toISOString()
  };
}

// Существующие функции сортировки
type SortType = "new" | "top" | "random" | "trending";

export function sortPosts(posts: Post[], type: SortType): Post[] {
  const postsCopy = [...posts];
  
  switch (type) {
    case "new":
      return postsCopy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case "top":
      return postsCopy.sort((a, b) => (b.voters?.length || 0) - (a.voters?.length || 0));
    case "random":
      return postsCopy.sort(() => Math.random() - 0.5);
    case "trending":
      return sortTrendingPosts(postsCopy);
    default:
      return postsCopy;
  }
}

function sortTrendingPosts(posts: Post[]): Post[] {
  const now = Date.now();
  return posts
    .map((post) => ({
      ...post,
      currentBoostWeight: post.boostAmount
        ? calculateBoostWeight(post.boostAmount, post.boostTime ?? now)
        : 0,
    }))
    .sort((a, b) => {
      if (a.currentBoostWeight !== b.currentBoostWeight) {
        return (b.currentBoostWeight || 0) - (a.currentBoostWeight || 0);
      }
      return (b.voters?.length || 0) - (a.voters?.length || 0);
    });
}

function calculateBoostWeight(amount: number, time: number): number {
  const hoursPassed = (Date.now() - time) / 3600000;
  const decay = BoostTiers[amount]?.decay || 0.3;
  return Math.max(0, amount * Math.pow(1 - decay, hoursPassed));
}