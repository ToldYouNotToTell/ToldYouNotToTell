import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  ctrlKey = false,
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key && (!ctrlKey || e.ctrlKey)) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback, ctrlKey]);
}
