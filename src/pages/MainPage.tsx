import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRestaurants } from '@/services/api';
import type { Restaurant } from '@/types';

const MainPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [price, setPrice] = useState<string>('All');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRestaurants(category);
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const filterRestaurant = restaurants.filter((restaurant) => {
    const filterOpen = isOpen ? restaurant.isOpen : true;

    const filterPrice = price === 'All' ? true : restaurant.priceLevel === price;

    return filterOpen && filterPrice;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Restaurants</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

      <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-200 mb-8">
        <span className="text-sm text-gray-400">Filter By:</span>

        {/* Filter Open Now*/}
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />
          Open Now
        </label>

        {/* Filter Price*/}
        <select title="Price" className="text-sm border-b border-gray-300 pb-1 outline-none" value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="All">Price</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>

        {/* Filter Category*/}
        <select title="Category" className="text-sm border-b border-gray-300 pb-1 outline-none" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">Categories</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>
      <h2 className="text-2xl mb-6">All Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filterRestaurant.map((restaurant) => (
            <div key={restaurant.id} className="flex flex-col gap-2">
              {/* Gambar restaurant */}
              <div className="aspect-4/3 w-full overflow-hidden bg-gray-100">
                <img src={restaurant.photos?.[0] || 'https://placehold.co/400x300?text=No+Image'} alt={restaurant.name} className="w-full h-full object-cover" />
              </div>

              {/* Nama*/}
              <h3 className="text-xl font-medium leading-tight">{restaurant.name}</h3>

              {/* Rating*/}
              <div className="flex text-blue-900 text-xl">
                {'★'.repeat(Math.floor(restaurant.rating))}
                {'☆'.repeat(5 - Math.floor(restaurant.rating))}
              </div>

              {/* Kategori & Harga */}
              <div className="flex justify-between items-center text-[13px] uppercase tracking-widest text-gray-600">
                <span>
                  {restaurant.categories?.[0] || 'No Category'} • {restaurant.priceLevel}
                </span>
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {restaurant.isOpen ? 'OPEN NOW' : 'CLOSED'}
                </span>
              </div>

              {/* Tombol Learn More */}
              <Link to={`/detail/${restaurant.id}`} className="mt-2 w-full bg-blue-900 text-white py-2 text-xs tracking-widest hover:bg-blue-800 transition-colors text-center block">
                LEARN MORE
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;
