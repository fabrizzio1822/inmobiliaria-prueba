"use client"; // Asegúrate de que esta directiva esté al principio

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Transition } from '../Transition'; // Asumo que la ruta es correcta
import { RiSearch2Line } from 'react-icons/ri';

export default function FloatedSearch() {
  // Estado local para el término de búsqueda, como en SearchForm
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); // Hook para la navegación

  // Lógica de manejo de búsqueda, adaptada de SearchForm
  const handleSearch = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    if (searchTerm.trim()) {
      router.push(`/search/results?query=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // Si la búsqueda está vacía, redirigir a la página de resultados sin query,
      // lo que debería mostrar todos los resultados o un mensaje apropiado.
      router.push(`/search/results`);
    }
    // Opcional: podrías limpiar el input después de la búsqueda si lo deseas
    // setSearchTerm(''); 
  };

  return (
    <Transition className="absolute bottom-10 md:-bottom-10 left-0 right-0 w-[70%] mx-auto">
      {/* El onSubmit ahora llama a handleSearch */}
      <form role='search' onSubmit={handleSearch} className="flex-col justify-evenly gap-4 py-4 bg-white rounded-md md:flex md:flex-row backdrop-blur shadow-light">
        <input 
          type='search' 
          placeholder='Introducí tu Provincia o la Propiedad que búscas' 
          aria-label='search' 
          // Conectar el input al estado local
          onChange={e => setSearchTerm(e.target.value)} 
          value={searchTerm}
          className='px-3 md:w-[70%] w-full md:py-2 py-4 md:mx-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-bordo focus:border-bordo' // Añadidos estilos para consistencia y foco
        />
        <button 
          type='submit'
          className="gap-4 border-[1px] rounded-lg px-14 py-5 bg-main-100 flex items-center text-white justify-center cursor-pointer m-auto hover:bg-black"
        >
          <RiSearch2Line />
          {/* Podrías agregar texto al botón si lo deseas, ej: <span className="ml-2 md:hidden lg:inline">Buscar</span> */}
        </button>
      </form>
    </Transition>
  );
}