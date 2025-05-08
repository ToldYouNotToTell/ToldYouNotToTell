// src/hooks/useIntersectionObserver.ts
import { useRef, useState, useEffect, useMemo } from "react";

export interface IntersectionObserverHookResult<T extends Element = Element> {
  ref: React.RefObject<T | null>;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export function useIntersectionObserver<T extends Element = Element>(
  options?: IntersectionObserverInit,
): IntersectionObserverHookResult<T> {
  const ref = useRef<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const isIntersecting = Boolean(entry?.isIntersecting);

  // Мемоизируем options для стабильной ссылки
  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([e]) => setEntry(e),
      memoizedOptions,
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [memoizedOptions]); // Используем мемоизированные options

  return { ref, isIntersecting, entry };
}
