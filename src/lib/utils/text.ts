export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingTime(text: string): string {
  const words = countWords(text);
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function highlightText(
  text: string,
  query: string,
  highlightClass = "highlight"
): string {
  if (!query) return text;

  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  return text.replace(regex, `<span class="${highlightClass}">$1</span>`);
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
