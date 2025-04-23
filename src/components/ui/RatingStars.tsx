interface RatingStarsProps {
    rating: number;
    onRate?: (value: number) => void;
    interactive?: boolean;
  }
  
  export const RatingStars = ({ rating, onRate, interactive = false }: RatingStarsProps) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => onRate?.(i + 1)}
            className={`text-xl ${
              i < rating ? 'text-yellow-400' : 'text-muted-foreground'
            } ${interactive ? 'hover:scale-110 transition-transform' : ''}`}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };