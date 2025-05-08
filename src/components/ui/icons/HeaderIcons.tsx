// src/components/ui/icons/HeaderIcons.tsx
"use client";

import { SVGProps } from "react";
import {
  FaSearch,
  FaUser,
  FaBell,
  FaHome,
  FaPlus,
  FaMoon,
  FaSun,
} from "react-icons/fa";

// Иконка поиска
export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <FaSearch size={16} {...props} />
);

// Иконка пользователя
export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <FaUser size={18} {...props} />
);

// Иконка уведомлений
export const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <FaBell size={18} {...props} />
);

// Иконка главной страницы
export const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <FaHome size={20} {...props} />
);

// Иконка добавления
export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <FaPlus size={20} {...props} />
);

// Иконки темы
export const MoonIcon = (props: SVGProps<SVGSVGElement>) => (
  <FaMoon size={16} {...props} />
);

export const SunIcon = (props: SVGProps<SVGSVGElement>) => (
  <FaSun size={16} {...props} />
);
