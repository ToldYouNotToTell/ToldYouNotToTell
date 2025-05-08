"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

type StarIconProps = {
  size?: number;
  filled?: boolean;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export default function StarIcon({
  size = 18,
  filled = false,
  className = "",
  ...props
}: StarIconProps) {
  return (
    <FaStar
      size={size}
      color={filled ? "var(--star-color)" : "var(--star-counter-color)"}
      className={className}
      {...props}
    />
  );
}
