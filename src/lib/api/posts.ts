import { Post } from '@/types/post';

export async function fetchPosts(): Promise<Post[]> {
  // В реальном приложении здесь был бы fetch к API
  return [];
}

export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  // Логика создания поста
  return { ...post, id: Date.now() };
}