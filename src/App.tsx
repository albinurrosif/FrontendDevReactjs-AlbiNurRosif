import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<MainPage />} />

        {/* Halaman Detail*/}
        <Route path="/detail/:id" element={<div>Halaman Detail Restoran</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
