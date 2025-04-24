"use client";

import { useWeb3 } from "@/hooks/useWeb3";
import { useModeration } from "@/hooks/useModeration";
import { Button } from "@/components/ui/button";
import { BoostDialog } from "@/components/modals/BoostDialog";

export const PostActions = ({
  post,
  isAuthor,
  isConnected,
}: {
  post: Post;
  isAuthor: boolean;
  isConnected: boolean;
}) => {
  const { reportPost } = useModeration();
  const { boostPost, walletAddress } = useWeb3();

  return (
    <div className="flex gap-2 mt-4">
      {isAuthor && (
        <>
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </>
      )}

      <BoostDialog
        postId={post.id}
        currentBoost={post.boostAmount}
        onBoost={boostPost}
      />

      <Button variant="ghost" size="sm" onClick={() => reportPost(post.id)}>
        Report
      </Button>
    </div>
  );
};