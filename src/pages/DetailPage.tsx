import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Star, ChevronLeft } from 'lucide-react';
import L from 'leaflet';

import { fetchRestaurantById } from '@/services/api';
import type { Restaurant } from '@/types';

import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet Marker
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load restaurant details.');
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);

  if (loading) return <div className="p-20 text-center animate-pulse text-gray-400 uppercase tracking-widest text-xs">Loading Details...</div>;
  if (error || !restaurant) return <div className="p-20 text-center text-red-500">{error || 'Restaurant not found.'}</div>;

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      {/* Navigation */}
      <nav className="mb-10">
        <Link to="/" className="flex items-center gap-1 text-blue-900 text-xs font-bold tracking-[0.2em] hover:opacity-70 transition-opacity uppercase">
          <ChevronLeft size={16} /> BACK
        </Link>
      </nav>

      <main className="flex flex-col gap-10">
        {/* Header Section */}
        <header>
          <h1 className="text-5xl font-light mb-4 text-slate-900">{restaurant.name}</h1>

          <div className="flex gap-0.5 text-blue-900 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill={i < Math.floor(restaurant.rating) ? 'currentColor' : 'none'} className={i < Math.floor(restaurant.rating) ? 'text-blue-900' : 'text-gray-300'} />
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-medium">
              {restaurant.categories?.join(' • ')} — {restaurant.priceLevel}
            </p>

            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-700">{restaurant.isOpen ? 'Open Now' : 'Closed'}</p>
            </div>
          </div>
        </header>

        <hr className="border-gray-100" />

        {/* Gallery Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurant.photos?.map((photo, index) => (
            <div key={index} className="aspect-video bg-gray-50 overflow-hidden border border-gray-100">
              <img src={photo} alt={`${restaurant.name} gallery ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </section>

        {/* Map Section */}
        <section className="w-full h-80 mb-4 z-0 relative">
          <h2 className="text-2xl font-light mb-6 text-slate-800">Location</h2>
          {restaurant.location ? (
            <MapContainer
              key={restaurant.id}
              center={[restaurant.location.lat, restaurant.location.lng]}
              zoom={16}
              scrollWheelZoom={false}
              className="h-full w-full border border-gray-100 rounded-sm"
            >
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[restaurant.location.lat, restaurant.location.lng]}>
                <Popup>
                  {restaurant.location.address}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full w-full bg-gray-50 flex items-center justify-center rounded-sm italic text-gray-400 text-sm">Location details are currently unavailable.</div>
          )}
        </section>

        <hr className="border-gray-100" />

        {/* Reviews Section */}
        <section className="pb-20">
          <h2 className="text-2xl font-light mb-10 text-slate-800">Reviews</h2>
          <div className="space-y-12">
            {restaurant.reviews && restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review) => (
                <div key={review.id} className="flex flex-col md:flex-row gap-8 pb-10 border-b border-gray-50 last:border-0">
                  {/* Review Image (User Photo of Food) */}
                  <div className="w-full md:w-48 h-40 shrink-0 overflow-hidden bg-gray-50 border border-gray-100">
                    <img src={review.userImage} alt={`Review by ${review.name}`} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900">{review.name}</h4>
                      <div className="flex gap-0.5 text-blue-900">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? 'text-blue-900' : 'text-gray-300'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic">"{review.text}"</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic text-sm">No reviews have been posted for this restaurant yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DetailPage;
