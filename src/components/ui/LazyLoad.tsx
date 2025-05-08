"use client";

import React, { useState, useEffect, useRef } from "react";

import { PostSkeleton } from "./PostSkeleton";

interface LazyLoadProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  threshold?: number;
  className?: string;
}

export const LazyLoad = ({
  children,
  placeholder = <PostSkeleton />,
  threshold = 0.05,
  className = "",
}: LazyLoadProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`lazy-load-container ${className}`}
      data-loaded={isVisible}
    >
      {isVisible ? children : placeholder}
    </div>
  );
};

export default LazyLoad;