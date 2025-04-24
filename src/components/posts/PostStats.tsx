"use client";

import { Post } from "@/types/post";
import { readingTime } from "@/lib/utils/text";
import { formatDate } from "@/lib/utils/date";

export default function PostStats({ post }: { post: Post }) {
  return (
    <div className="post-stats">
      <span title="Publication date">
        <i className="far fa-calendar-alt"></i> {formatDate(post.date)}
      </span>
      <span title="Reading time">
        <i className="far fa-clock"></i> {readingTime(post.content)}
      </span>
      <span title="Comments">
        <i className="far fa-comment"></i> {post.comments?.length || 0}
      </span>
      <span title="Rating">
        <i className="far fa-star"></i> {post.voters?.length || 0}
      </span>
    </div>
  );
}
