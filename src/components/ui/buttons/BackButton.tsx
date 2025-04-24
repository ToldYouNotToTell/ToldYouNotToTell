'use client';
import React from 'react';

type Props = {
    onClick: () => void;
  };
/**
 * Кнопка «Наверх» — рендерит точно ваш HTML-код из index.html.
 * Для плавного скролла наверх при клике.
 */
export default function BackButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      title="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}