"use client";

import { CATEGORIES } from "@/lib/constants/categories";

export default function CategorySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (category: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="category-selector"
      aria-label="Select category"
    >
      <option value="">Select a category</option>
      {CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
