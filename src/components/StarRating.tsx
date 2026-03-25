import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  return (
    <div className="flex gap-0.5 text-primary">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} fill={i < Math.floor(rating) ? 'currentColor' : 'none'} className={i < Math.floor(rating) ? 'text-primary' : 'text-slate-200'} />
      ))}
    </div>
  );
};
