'use client';

import React, { SVGProps } from 'react';
import { FaFire } from 'react-icons/fa';

type FireIconProps = SVGProps<SVGSVGElement> & {
  /** Размер иконки в пикселях (по умолчанию 16) */
  size?: number;
};

/**
 * Компонент иконки огня (Trending).
 * Использует библиотеку react-icons (FontAwesome).
 */
export default function FireIcon({
  size = 16,
  ...props
}: FireIconProps) {
  return <FaFire size={size} {...props} />;
}