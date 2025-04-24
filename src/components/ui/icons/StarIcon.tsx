'use client';

import React, { SVGProps } from 'react';
import { FaStar } from 'react-icons/fa';

type StarIconProps = SVGProps<SVGSVGElement> & {
  /** Размер иконки в пикселях (по умолчанию 18) */
  size?: number;
  /** Заполненная или пустая звезда (цвет) */
  filled?: boolean;
};

/**
 * Компонент звёздочки для рейтинга.
 * Если `filled={false}`, будет контурная звезда.
 */
export default function StarIcon({
  size = 18,
  filled = true,
  ...props
}: StarIconProps) {
  return (
    <FaStar
      size={size}
      {...props}
      style={{
        color: filled ? 'gold' : props.style?.color || 'var(--icon-color)',
        ...props.style,
      }}
    />
  );
}