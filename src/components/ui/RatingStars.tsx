// src/components/ui/RatingStars.tsx
'use client';

import React, { useState } from 'react';

export interface RatingStarsProps {
  /**
   * The ID of the post being rated.
   */
  postId: string;
  /**
   * The initial number of stars (e.g. length of `post.voters`).
   */
  initialRating: number;
  /**
   * Optional callback called when the user clicks a star.
   * Receives the postId and the new rating.
   */
  onRate?: (postId: string, newRating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  postId,
  initialRating,
  onRate,
}) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleClick = (star: number) => {
    setRating(star);
    onRate?.(postId, star);
  };

  return (
    <div className="rating-stars" style={{ cursor: 'pointer', userSelect: 'none' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          aria-label={`${star} Star${star > 1 ? 's' : ''}`}
        >
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};