'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types/post';

export default function EditTimer({ post }: { post: Post }) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const threeHours = 3 * 60 * 60 * 1000;
      const timePassed = Date.now() - new Date(post.date).getTime();
      const remaining = threeHours - timePassed;

      if (remaining <= 0) {
        setTimeLeft(null);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [post.date]);

  if (!timeLeft) return null;

  return (
    <div 
      className="edit-timer" 
      title="Time left to edit"
      onClick={() => alert('Your stories can be edited or deleted only within the first 3 hours')}
    >
      <i className="fas fa-hourglass-half"></i> {timeLeft}
    </div>
  );
}