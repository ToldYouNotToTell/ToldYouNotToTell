"use client";

import React from "react";

export const PostSkeleton = () => (
  <div className="post-skeleton">
    <div className="skeleton-header">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-author"></div>
    </div>
    <div className="skeleton-title"></div>
    <div className="skeleton-content"></div>
    <div className="skeleton-footer">
      <div className="skeleton-button"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export default PostSkeleton;
