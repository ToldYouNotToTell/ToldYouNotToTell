// src/components/ui/icons/ClockIcon.tsx
'use client';

import { FaClock } from 'react-icons/fa';

export default function ClockIcon({
  size = 16,
  className = ''
}: {
  size?: number;
  className?: string;
}) {
  return <FaClock size={size} className={className} />;
}