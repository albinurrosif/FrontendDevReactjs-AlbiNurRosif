# Restaurant Apps - Frontend Developer Challenge

---

![App Screenshot](docs/screenshot.png)

---

## Live Demo

[Open Live Demo](https://frontenddevreactjs-albinurrosif.netlify.app/)

---

## Tech Stack

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-purple)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-4-cyan)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/UI-Shadcn-black)](https://ui.shadcn.com/)
[![React Router](https://img.shields.io/badge/Routing-React%20Router%207-red)](https://reactrouter.com/)
[![React Leaflet](https://img.shields.io/badge/Maps-React%20Leaflet-green)](https://react-leaflet.js.org/)

---

## Features

- Menampilkan daftar restoran
- Filter restoran
- Halaman detail restoran
- Menampilkan lokasi restoran menggunakan map(dummy)

---

## API

Data diambil dari MockAPI:

https://69c3bf29b780a9ba03e7cc75.mockapi.io/restaurants

---

## Project Specifications

- React Version: 19.2.4
- Node.js Version (development): 24.11.1
- Recommended Node.js: >= 18
- Build Tool: Vite
- CSS Framework: Tailwind CSS 4.2.2
- Routing: React Router 7
- Maps: React Leaflet 5

---

## Project Structure

src/
  components/    # reusable UI components
  pages/         # main pages (home, detail)
  services/      # API calls
  types/         # TypeScript types

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/albinurrosif/FrontendDevReactjs-AlbiNurRosif.git
cd FrontendDevReactjs-AlbiNurRosif
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

---

## Troubleshooting

- Jika terjadi error saat install:
  hapus `node_modules` dan `package-lock.json`, lalu jalankan `npm install` ulang

- Jika port sudah digunakan:
  Vite akan otomatis menggunakan port lain

---