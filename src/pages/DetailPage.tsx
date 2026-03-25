import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ChevronLeft } from 'lucide-react';
import L from 'leaflet';

import { fetchRestaurantById } from '@/services/api';
import type { Restaurant } from '@/types';

import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { Button } from '@/components/ui/button';
import { InlineLoader } from '@/components/InlineLoader';
import { StarRating } from '@/components/StarRating';
import { ReviewItem } from '@/components/ReviewItem';

// Leaflet Fix
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
        setError('Failed to load restaurant details.');
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);

  if (error && !loading) return <div className="p-20 text-center text-red-500">{error}</div>;
  if (!loading && !restaurant) return <div className="p-20 text-center text-gray-500">Restaurant not found.</div>;

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <nav className="mb-10">
        <Button variant="ghost" asChild className="p-0 hover:bg-transparent text-primary tracking-[0.2em] text-xs font-bold">
          <Link to="/" className="flex items-center gap-1 uppercase">
            <ChevronLeft size={16} /> BACK
          </Link>
        </Button>
      </nav>

      <main className="flex flex-col gap-10">
        <header>
          <h1 className="text-5xl font-light mb-4 text-foreground">{loading ? 'Loading...' : restaurant?.name}</h1>

          {!loading && restaurant && (
            <>
              <div className="mb-4">
                <StarRating rating={restaurant.rating} size={20} />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-medium">
                  {restaurant.categories?.join(' • ')} — {restaurant.priceLevel}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{restaurant.isOpen ? 'Open Now' : 'Closed'}</p>
                </div>
              </div>
            </>
          )}
        </header>

        <hr className="border-border" />

        {loading ? (
          <InlineLoader />
        ) : (
          <>
            {/* Gallery */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurant?.photos?.map((photo, index) => (
                <div key={index} className="aspect-video bg-gray-50 overflow-hidden border border-border">
                  <img src={photo} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </section>

            {/* Map */}
            <section className="w-full h-80 mb-4 z-0 relative">
              <h2 className="text-2xl font-light mb-6 text-primary">Location</h2>
              {restaurant?.location ? (
                <MapContainer key={restaurant.id} center={[restaurant.location.lat, restaurant.location.lng]} zoom={16} className="h-full w-full border border-border">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[restaurant.location.lat, restaurant.location.lng]}>
                    <Popup>{restaurant.location.address}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="h-full w-full bg-gray-50 flex items-center justify-center italic text-gray-400 text-sm">Location unavailable.</div>
              )}
            </section>

            <hr className="border-border mt-15" />

            {/* Reviews */}
            <section className="pb-20">
              <h2 className="text-2xl font-light mb-10 text-primary">Reviews</h2>
              <div className="space-y-12">
                {restaurant?.reviews && restaurant.reviews.length > 0 ? restaurant.reviews.map((review) => <ReviewItem key={review.id} review={review} />) : <p className="text-gray-400 italic text-sm">No reviews yet.</p>}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default DetailPage;
