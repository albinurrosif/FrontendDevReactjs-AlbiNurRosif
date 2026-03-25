/**
 * @fileoverview Service untuk mengelola permintaan data ke API eksternal.
 * Mengimplementasikan pengambilan data restoran dengan dukungan filter kategori.
 */

import type { Restaurant } from '@/types';

const BASE_URL = 'https://69c3bf29b780a9ba03e7cc75.mockapi.io';

/**
 * Mengambil daftar restoran dari MockAPI.
 * * @param {string} categories - Nama kategori masakan untuk difilter oleh server.
 * @returns {Promise<Restaurant[]>} Promise yang menghasilkan array objek Restaurant.
 * @throws {Error} Jika respons network tidak berhasil.
 */
export const fetchRestaurants = async (categories?: string): Promise<Restaurant[]> => {
  try {
    const url = new URL(`${BASE_URL}/restaurants`);

    if (categories && categories !== 'All') {
      url.searchParams.append('categories', categories);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Restaurant[];
  } catch (error) {
    console.error('Gagal mengambil data restoran:', error);
    throw error;
  }
};

/**
 * Mengambil detail satu restoran berdasarkan ID.
 * @param {string} id - ID unik restoran dari URL.
 * @returns {Promise<Restaurant>}
 */
export const fetchRestaurantById = async (id: string): Promise<Restaurant> => {
   try {
     const response = await fetch(`${BASE_URL}/restaurants/${id}`);

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }

     return await response.json();
   } catch (error) {
     console.error('Gagal mengambil data restoran:', error);
     throw error;
   }
};
