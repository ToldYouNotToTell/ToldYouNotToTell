// src/components/ui/icons/ReactIcon.tsx
'use client';

import React from 'react';

export interface ReactIconProps {
  /** Имя иконки без префикса, например 'wallet', 'times', 'moon' */
  name: string;
  /** Префикс: 'fas' (solid), 'far' (regular), 'fab' (brands) и т.д. */
  prefix?: 'fas' | 'far' | 'fab';
  /** Дополнительные CSS-классы */
  className?: string;
  /** aria-label и title для доступности */
  title?: string;
}

/**
 * Обёртка для FontAwesome-иконок.
 * Генерирует точно такой же <i class="fas fa-wallet">…</i>, как в вашем HTML.
 */
export const ReactIcon: React.FC<ReactIconProps> = ({
  name,
  prefix = 'fas',
  className = '',
  title,
  ...props
}) => {
  const classes = [prefix, `fa-${name}`, className].filter(Boolean).join(' ');

  return (
    <i
      className={classes}
      {...(!title
        ? { 'aria-hidden': 'true' }
        : { 'aria-label': title, title })}
      {...props}
    ></i>
  );
};