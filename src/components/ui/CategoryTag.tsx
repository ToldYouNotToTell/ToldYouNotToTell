'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface CategoryTagProps {
  category: string;
  className?: string;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({
  category,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-block px-2 py-1 text-xs font-medium rounded-full',
        'bg-primary/20 text-primary',
        className
      )}
    >
      {category}
    </span>
  );
};