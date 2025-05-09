// src/components/posts/index.ts
export { default as PostList } from "./PostList";
export { default as PostForm } from "./PostForm";
export { default as PostActions } from "./PostActions"; // Исправлено на default export
export { default as SortControls } from "./SortControls";
export { default as ShareButtons } from "./ShareButtons";
export { default as CommentSection } from "./comments/CommentForm";

// Если PostCard не существует, закомментируйте или создайте его:
// export { default as PostCard } from '@/components/ui/cards/PostCard';
