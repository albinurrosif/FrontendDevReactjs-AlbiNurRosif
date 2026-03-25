/**
 * @fileoverview Definisi tipe data global untuk aplikasi Restaurant.
 * Memastikan konsistensi data antara API response dan komponen UI.
 */

/**
 * Merepresentasikan data review dari pengguna pada halaman detail.
 */
export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  userImage: string;
}

/**
 * Merepresentasikan lokasi restoran.
 */
export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

/**
 * Merepresentasikan entitas Restoran
 */
export interface Restaurant {
  id: string;
  name: string;
  photos: string[];
  categories: string[];
  rating: number;
  priceLevel: string;
  isOpen: boolean;
  reviews?: Review[];
  location?: Location;
}
