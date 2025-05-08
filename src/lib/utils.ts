// src/lib/utils.ts
/**
 * Объединяет CSS-классы, отбрасывая undefined, null, false и пустые строки.
 */
export function cn(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}
