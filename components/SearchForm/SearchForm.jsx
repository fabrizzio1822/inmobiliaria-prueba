"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Asumo que tienes un ícono de búsqueda, puedes usar uno de react-icons o similar
// import { FiSearch } from 'react-icons/fi'; 

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/results?query=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // Opcional: manejar el caso de búsqueda vacía, por ejemplo, mostrar un mensaje
      router.push(`/search/results`); // O redirigir a la página principal de propiedades
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xl mx-auto my-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por tipo, ubicación, características..."
        className="px-4 py-3 border border-gray-300  rounded-lg sm:rounded-l-lg focus:ring-2 focus:border-bordo flex-grow text-gray-700 text-sm"
      />
      <button
        type="submit"
        className="bg-main-100 hover:bg-main-200 text-white font-semibold py-3 px-6 rounded-lg sm:rounded-r-lg flex items-center justify-center transition-colors duration-150 text-sm"
      >
        {/* <FiSearch className="mr-2 h-5 w-5" /> Reemplaza con tu ícono si lo tienes */}
        Buscar
      </button>
    </form>
  );
}