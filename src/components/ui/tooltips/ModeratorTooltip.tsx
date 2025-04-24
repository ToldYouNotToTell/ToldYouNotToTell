'use client';

import React, { ReactNode, useState } from 'react';

interface ModeratorTooltipProps {
  /** Текст подсказки, показываемой при наведении */
  content: string;
  /** Элемент-обертка (например, иконка модератора) */
  children: ReactNode;
}

/**
 * Компонент спана, оборачивающего элемент и показывающего подсказку модератора.
 */
export default function ModeratorTooltip({
  content,
  children,
}: ModeratorTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="moderator-badge"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{ position: 'relative', cursor: 'help' }}
    >
      {children}
      {visible && (
        <div className="moderator-tooltip" style={{
          position: 'absolute',
          bottom: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--text-color)',
          padding: '8px 12px',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          whiteSpace: 'nowrap',
          zIndex: 1000,
        }}>
          {content}
        </div>
      )}
    </span>
  );
}