'use client';
import { FaClock } from 'react-icons/fa';

interface ClockIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ClockIcon({
  size = 16,
  className = '',
  style = {},
}: ClockIconProps) {
  return <FaClock size={size} className={className} style={style} />;
}