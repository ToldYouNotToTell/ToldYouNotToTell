'use client';

import { PostList } from '@/components/posts/PostList';
import { SortControls } from '@/components/posts/SortControls';
import { StakingRewards } from '@/components/StakingRewards';
import { usePosts } from '@/hooks/usePosts';
import { useWeb3 } from '@/hooks/useWeb3';

export default function Home() {
  const { posts, loading, sortPosts } = usePosts();
  const { isConnected, connectWallet } = useWeb3();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Anonymous Confessions</h1>
        {!isConnected && (
          <button 
            onClick={connectWallet}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <StakingRewards />
      <SortControls onSort={sortPosts} />
      
      {loading ? (
        <div className="text-center py-12">Loading posts...</div>
      ) : (
        <PostList posts={posts} />
      )}
    </main>
  );
}