// src/components/posts/PostMetadata.tsx
"use client";

import React from "react";

import { CategoryTag } from "@/components/ui/CategoryTag";
import { formatDate } from "@/lib/utils/date";

interface PostMetadataProps {
  date: string;
  category?: string;
}

export default function PostMetadata({ date, category }: PostMetadataProps) {
  return (
    <div className="post-date-category">
      {/* Отформатированная дата */}
      <span className="post-date">{formatDate(date)}</span>

      {/* Тег категории, если он есть */}
      {category && <CategoryTag category={category} />}
    </div>
  );
}
