import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { fetchRestaurants } from '@/services/api';
import type { Restaurant } from '@/types';

import { Button } from '@/components/ui/button';
import { InlineLoader } from '@/components/InlineLoader';
import { RestaurantCard } from '@/components/RestaurantCard';
import { FilterBar } from '@/components/FilterBar';

const MainPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRestaurants(category);
        setRestaurants(data);
      } catch (err) {
        setError('Failed to load restaurants.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesOpen = isOpen ? r.isOpen : true;
    const matchesPrice = price === 'All' ? true : r.priceLevel === price;
    return matchesOpen && matchesPrice;
  });

  const displayedRestaurants = filteredRestaurants.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-5xl font-light mb-6 text-foreground">Restaurants</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quisquam debitis cum corrupti quaerat accusamus?</p>
      </header>

      <FilterBar isOpen={isOpen} setIsOpen={setIsOpen} price={price} setPrice={setPrice} category={category} setCategory={setCategory} />

      <main>
        <h2 className="text-3xl font-light mb-10 text-primary">All Restaurants</h2>

        {error && (
          <div className="text-red-700 mb-8">
            <AlertCircle /> {error}
          </div>
        )}

        {isLoading ? (
          <InlineLoader />
        ) : displayedRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {displayedRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-muted-foreground mb-4">No restaurants found.</p>
            <Button
              variant="outline"
              onClick={() => {
                setCategory('All');
                setPrice('All');
                setIsOpen(false);
              }}
            >
              Clear All
            </Button>
          </div>
        )}

        {!isLoading && filteredRestaurants.length > visibleCount && (
          <div className="mt-10 flex justify-center p-10">
            <Button variant="outline" onClick={() => setVisibleCount((p) => p + 4)} className="px-24 py-6 border-primary rounded-none uppercase">
              Load More
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
