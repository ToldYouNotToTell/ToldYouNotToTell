"use client";

import { ReactNode, useState, useRef } from "react";

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

export default function Tooltip({
  content,
  children,
  position = "top",
  shortcut,
}: {
  content: string | ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  shortcut?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Всегда вызываем хук, передавая пустую строку если shortcut не указан
  useKeyboardShortcut(shortcut || "", () => setIsVisible(!isVisible), true);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      ref={tooltipRef}
    >
      {children}
      {isVisible && (
        <div className={`tooltip tooltip-${position}`}>
          {content}
          {shortcut && (
            <span className="tooltip-shortcut">Ctrl+{shortcut}</span>
          )}
        </div>
      )}
    </div>
  );
}
