'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  count?: number;
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ count = 5, rating, onRatingChange, size = 'md' }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => onRatingChange(ratingValue)}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`Rate ${ratingValue} out of ${count}`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                'transition-colors',
                ratingValue <= (hoverRating || rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
