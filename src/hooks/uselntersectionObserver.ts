// src/hooks/useIntersectionObserver.ts
import { useEffect, useRef } from "react";

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => { /*…*/ }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return ref;
}