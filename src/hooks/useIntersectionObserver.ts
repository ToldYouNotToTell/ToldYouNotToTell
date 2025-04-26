// src/hooks/useIntersectionObserver.ts
import { useRef, useState, useEffect } from 'react';

export interface IntersectionObserverHookResult<T extends Element = Element> {
  /** Ссылка на элемент, за видимостью которого следим */
  ref: React.RefObject<T | null>;
  /** true, если элемент пересекает viewport по заданным опциям */
  isIntersecting: boolean;
  /** Детали пересечения */
  entry?: IntersectionObserverEntry;
}

/**
 * Хук для отслеживания видимости элемента.
 * @param options — опции для IntersectionObserver
 */
export function useIntersectionObserver<T extends Element = Element>(
  options?: IntersectionObserverInit
): IntersectionObserverHookResult<T> {
  const ref = useRef<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const isIntersecting = Boolean(entry?.isIntersecting);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([e]) => setEntry(e), options);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [JSON.stringify(options)]);

  return { ref, isIntersecting, entry };
}