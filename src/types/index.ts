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
 * Merepresentasikan entitas Restoran
 */
export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  rating: number;
  priceLevel: string;
  isOpen: boolean;
  reviews?: Review[];
}
