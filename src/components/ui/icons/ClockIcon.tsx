'use client';

import React, { SVGProps } from 'react';
import { FaClock } from 'react-icons/fa';

type ClockIconProps = SVGProps<SVGSVGElement> & {
  /** Размер иконки в пикселях (по умолчанию 16) */
  size?: number;
};

/**
 * Компонент иконки часов.
 * Использует библиотеку react-icons (FontAwesome).
 */
export default function ClockIcon({
  size = 16,
  ...props
}: ClockIconProps) {
  return <FaClock size={size} {...props} />;
}