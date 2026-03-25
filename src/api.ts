import type { Restaurant } from '@/types';

/**
 * @fileoverview Service untuk mengelola permintaan data ke API eksternal.
 * Mengimplementasikan pengambilan data restoran dengan dukungan filter kategori.
 */

const BASE_URL = 'https://69c3bf29b780a9ba03e7cc75.mockapi.io';

/**
 * Mengambil daftar restoran dari MockAPI.
 * * @param {string} category - Nama kategori masakan untuk difilter oleh server.
 * @returns {Promise<Restaurant[]>} Promise yang menghasilkan array objek Restaurant.
 * @throws {Error} Jika respons network tidak berhasil.
 */
export const fetchRestaurants = async (category?: string): Promise<Restaurant[]> => {
  try {
    const url = new URL(`${BASE_URL}/restaurants`);

    if (category && category !== 'All') {
      url.searchParams.append('category', category);
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
