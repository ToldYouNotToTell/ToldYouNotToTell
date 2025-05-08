// src/types/moderation.d.ts

export interface Report {
  id: number;
  postId: number;
  reason: string;
  date: string;
  reporterIP: string;
  status: "pending" | "resolved";
}

export interface ModerationAction {
  id: number;
  postId: number;
  moderator: string;
  action: "delete" | "edit" | "dismiss";
  date: string;
  note?: string;
}
