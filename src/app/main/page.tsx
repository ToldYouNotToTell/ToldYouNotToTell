import Header from '@/components/header/Header';
import PostList from '@/components/posts/PostList';
import SortControls from '@/components/posts/SortControls';

export default function Home() {
  return (
    <main className="container">
      <Header />
      <SortControls />
      <PostList />
    </main>
  );
}