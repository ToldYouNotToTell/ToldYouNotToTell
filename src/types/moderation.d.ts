interface Report {
  id: number;
  postId: number;
  reason: string;
  date: string;
  reporterIP: string;
  status: "pending" | "resolved";
}

interface ModerationAction {
  id: number;
  postId: number;
  moderator: string;
  action: "delete" | "edit" | "dismiss";
  timestamp: string;
  note?: string;
}