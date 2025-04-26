// src/components/ui/icons/ClockIcon.tsx
'use client';

import { FaClock } from 'react-icons/fa';

interface ClockIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties; // Добавляем поддержку style
}

export default function ClockIcon({
  size = 16,
  className = '',
  style = {} // Значение по умолчанию
}: ClockIconProps) {
  return <FaClock size={size} className={className} style={style} />;
}