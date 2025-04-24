"use client";

import { usePosts } from "@/hooks/usePosts";
import PostCard from "./PostCard";

export default function PostList() {
  const { posts } = usePosts();

  return (
    <div className="post-container" id="posts">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
