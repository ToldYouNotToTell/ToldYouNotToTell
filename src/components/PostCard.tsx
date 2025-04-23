'use client';

import { useWeb3 } from '@/hooks/useWeb3';
import { PostActions } from './PostActions';
import { CategoryTag } from '@/components/ui/CategoryTag';
import { RatingStars } from '@/components/ui/RatingStars';
import { formatDate } from '@/lib/utils/dateFormatter';

export const PostCard = ({ post }: { post: Post }) => {
  const { walletAddress, isConnected } = useWeb3();
  const isAuthor = post.authorWallet === walletAddress;

  return (
    <div className={`post-card ${post.boosted ? 'boosted' : ''}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        {isAuthor && <span className="badge">Your Post</span>}
      </div>
      
      {post.category && <CategoryTag category={post.category} />}
      
      <p className="my-4 whitespace-pre-line">{post.content}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-muted-foreground">
          {formatDate(post.createdAt)}
        </span>
        <RatingStars postId={post.id} initialRating={post.rating} />
      </div>

      <PostActions 
        post={post} 
        isAuthor={isAuthor} 
        isConnected={isConnected}
      />
    </div>
  );
};