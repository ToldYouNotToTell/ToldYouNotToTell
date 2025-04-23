import Header from '@/components/header/Header';
import PostList from '@/components/posts/PostList';
import SortControls from '@/components/ui/SortControls';
import PostForm from '@/components/posts/PostForm';
import BackToTopButton from '@/components/ui/buttons/BackToTopButton';
import { usePosts } from '@/hooks/usePosts';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const { posts, addPost, editPost, deletePost } = usePosts();
  const { theme } = useTheme();

  return (
    <div className={`container ${theme}`}>
      <Header />
      <SortControls />
      
      <PostList 
        posts={posts} 
        onEdit={editPost} 
        onDelete={deletePost} 
      />
      
      <PostForm onSubmit={addPost} />
      <BackToTopButton />
    </div>
  );
}