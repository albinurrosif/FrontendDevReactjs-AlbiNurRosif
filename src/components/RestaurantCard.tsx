import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StarRating } from './StarRating';
import type { Restaurant } from '@/types';

export const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <article className="flex flex-col gap-3 group">
      <div className="aspect-4/3 w-full overflow-hidden bg-secondary relative">
        <img src={restaurant.photos?.[0] || 'https://placehold.co/400x300?text=No+Image'} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      <h3 className="text-xl font-normal text-foreground">{restaurant.name}</h3>

      <div className="mb-4">
        <StarRating rating={restaurant.rating} />
      </div>

      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <span>
          {restaurant.categories?.[0] || 'General'} • {restaurant.priceLevel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {restaurant.isOpen ? 'OPEN NOW' : 'CLOSED'}
        </span>
      </div>

      <Button asChild className="w-full rounded-none bg-primary hover:bg-primary text-xs tracking-[0.2em] py-6 uppercase">
        <Link to={`/detail/${restaurant.id}`}>Learn More</Link>
      </Button>
    </article>
  );
};
