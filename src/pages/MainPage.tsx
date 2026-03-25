import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, AlertCircle } from 'lucide-react';
import { fetchRestaurants } from '@/services/api';
import type { Restaurant } from '@/types';

const MainPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [price, setPrice] = useState<string>('All');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchRestaurants(category);
        setRestaurants(data);
      } catch (err) {
        setError('Failed to load restaurants. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesOpen = isOpen ? restaurant.isOpen : true;
    const matchesPrice = price === 'All' ? true : restaurant.priceLevel === price;
    return matchesOpen && matchesPrice;
  });

  const displayedRestaurants = filteredRestaurants.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-5xl font-light mb-6 text-slate-900">Restaurants</h1>
        <p className="text-gray-500 max-w-2xl leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nesciunt hic amet, placeat distinctio eaque?
        </p>
      </header>

      {/* Filter Bar */}
      <section className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100 mb-10">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Filter By:</span>

        <label className="flex items-center gap-3 text-sm cursor-pointer text-slate-700">
          <input type="checkbox" className="w-4 h-4 accent-blue-900" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />
          Open Now
        </label>

        <select aria-label="Filter by Price" className="text-sm border-b border-gray-300 bg-transparent pb-1 outline-none focus:border-blue-900 transition-colors cursor-pointer" value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="All">Price</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>

        <select
          aria-label="Filter by Category"
          className="text-sm border-b border-gray-300 bg-transparent pb-1 outline-none focus:border-blue-900 transition-colors cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">Categories</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Japanese">Japanese</option>
        </select>
      </section>

      <main>
        <h2 className="text-3xl font-light mb-10 text-slate-800">All Restaurants</h2>

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-700 rounded-md mb-8">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-50 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : displayedRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {displayedRestaurants.map((restaurant) => (
              <article key={restaurant.id} className="flex flex-col gap-3 group">
                {/* Image */}
                <div className="aspect-4/3 w-full overflow-hidden bg-gray-100 relative">
                  <img src={restaurant.photos?.[0] || 'https://placehold.co/400x300?text=No+Image'} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                <h3 className="text-xl font-normal text-slate-900">{restaurant.name}</h3>

                {/* Rating */}
                <div className="flex gap-0.5 text-blue-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(restaurant.rating) ? 'currentColor' : 'none'} className={i < Math.floor(restaurant.rating) ? 'text-blue-900' : 'text-gray-300'} />
                  ))}
                </div>

                {/* Categories and Price */}
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span>
                    {restaurant.categories?.[0] || 'General'} • {restaurant.priceLevel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {restaurant.isOpen ? 'OPEN NOW' : 'CLOSED'}
                  </span>
                </div>

                <Link to={`/detail/${restaurant.id}`} className="mt-2 w-full bg-blue-900 text-white py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-slate-800 transition-all text-center block uppercase">
                  Learn More
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-400 text-lg mb-4">No restaurants found matching your criteria.</p>
            <button
              onClick={() => {
                setCategory('All');
                setPrice('All');
                setIsOpen(false);
              }}
              className="text-blue-900 font-semibold hover:text-blue-700 transition-colors uppercase text-xs tracking-widest"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && filteredRestaurants.length > visibleCount && (
          <div className="mt-20 flex justify-center border-t border-gray-100 pt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="w-full md:w-96 py-4 border border-blue-900 text-blue-900 text-[10px] font-bold tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all uppercase"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
