import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(10).max(100),
  content: z.string().min(100).max(650),
  category: z.string().optional(),
});

export const commentSchema = z.object({
  text: z.string().min(1).max(500),
});
