import { cn } from "@/lib/utils";

interface CategoryTagProps {
  category: string;
  className?: string;
}

export const CategoryTag = ({ category, className }: CategoryTagProps) => {
  return (
    <span 
      className={cn(
        "inline-block px-2 py-1 text-xs font-medium rounded-full",
        "bg-primary/20 text-primary",
        className
      )}
    >
      {category}
    </span>
  );
};