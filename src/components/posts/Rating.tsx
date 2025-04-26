// src/components/posts/Rating.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePosts } from '@/contexts/PostsContext';

export default function Rating({
  postId,
  initialRating,
}: {
  postId: string; // Изменено с number на string
  initialRating: number;
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const { ratePost } = usePosts();

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = async (value: number) => {
    try {
      setIsRating(true);
      await ratePost(postId); // Теперь правильно ожидает Promise
      setRating(value);
    } catch (error) {
      console.error("Rating error:", error);
      // Можно добавить уведомление для пользователя
    } finally {
      setIsRating(false);
    }
  };

  return (
    <div className="rating-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= (hover || rating) ? 'active' : ''}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRating(star)}
          disabled={isRating}
          aria-label={`Rate ${star} star`}
        >
          ★
        </button>
      ))}
      <span className="star-counter">{rating}</span>
    </div>
  );
}