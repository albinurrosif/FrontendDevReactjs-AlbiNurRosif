import { StarRating } from './StarRating';
import type { Review } from '@/types';

export const ReviewItem = ({ review }: { review: Review }) => (
  <div className="flex flex-col md:flex-row gap-8 pb-10 border-b border-gray-50 last:border-0">
    <div className="w-full md:w-48 h-40 shrink-0 overflow-hidden bg-gray-50 border border-border">
      <img src={review.userImage} alt={`Review by ${review.name}`} className="w-full h-full object-cover" />
    </div>

    <div className="flex flex-col gap-3 flex-1">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-foreground">{review.name}</h4>
        <StarRating rating={review.rating} size={12} />
      </div>
      <p className="text-gray-600 text-sm leading-relaxed italic">"{review.text}"</p>
    </div>
  </div>
);
