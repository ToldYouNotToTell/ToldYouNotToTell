"use client";

import { CSSProperties } from "react";

export default function LoadingIndicator({
  size = 40,
  color = "var(--primary-color)",
}: {
  size?: number;
  color?: string;
}) {
  const style: CSSProperties = {
    width: size,
    height: size,
    border: `${size / 10}px solid rgba(0, 0, 0, 0.1)`,
    borderTop: `${size / 10}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div style={style} aria-label="Loading..."></div>
    </>
  );
}