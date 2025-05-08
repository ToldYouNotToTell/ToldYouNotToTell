// src/lib/utils/date.ts
export function formatDate(date: Date | string): string {
  if (typeof date === "string") date = new Date(date);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(date: Date | string): string {
  if (typeof date === "string") date = new Date(date);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }
  return "Just now";
}

export function getEditTimeLeft(postDate: Date | string): string | null {
  if (typeof postDate === "string") postDate = new Date(postDate);
  const threeHours = 3 * 60 * 60 * 1000;
  const timeLeft = threeHours - (Date.now() - postDate.getTime());
  if (timeLeft <= 0) return null;
  
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

// Перенесено из helpers.ts
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text).catch(() => {});
};