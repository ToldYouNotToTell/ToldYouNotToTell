"use client";

import { useState, useEffect } from "react";
import { usePosts } from "@/hooks/usePosts";

export default function Rating({
  postId,
  initialRating,
}: {
  postId: number;
  initialRating: number;
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const { ratePost } = usePosts();

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = async (value: number) => {
    try {
      await ratePost(postId);
      setRating(value);
    } catch (error) {
      console.error("Rating error:", error);
    }
  };

  return (
    <div className="rating-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`star ${star <= (hover || rating) ? "active" : ""}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRating(star)}
        >
          ★
        </i>
      ))}
      <span className="star-counter">{rating}</span>
    </div>
  );
}
