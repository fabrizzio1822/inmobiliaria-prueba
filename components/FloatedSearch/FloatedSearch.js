"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Transition } from '../Transition';
import { RiSearch2Line, RiArrowDownSLine } from 'react-icons/ri';

export default function FloatedSearch({ properties = [] }) {
  const [operation, setOperation] = useState('Venta');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const router = useRouter();

  // Filtrar propiedades basadas en la operación seleccionada
  const propertiesForOperation = properties.filter(p => p.operation === operation);

  // Obtener ubicaciones disponibles para la operación actual
  const availableLocations = Array.from(new Set(
    propertiesForOperation.map(p => p.location)
  )).sort();

  // Obtener tipos de propiedad disponibles para la operación y ubicación actual
  const propertiesForType = location
    ? propertiesForOperation.filter(p => p.location === location)
    : propertiesForOperation;

  const availableTypes = Array.from(new Set(
    propertiesForType.map(p => p.type)
  )).sort();

  // Si la ubicación seleccionada ya no está disponible tras cambiar de operación, limpiar el selector
  if (location && !availableLocations.includes(location)) {
    setLocation('');
  }

  // Si el tipo seleccionado ya no está disponible tras cambiar ubicación/operación, limpiar el selector
  if (propertyType && !availableTypes.includes(propertyType)) {
    setPropertyType('');
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (operation) params.set('operation', operation);
    if (location) params.set('location', location);
    if (propertyType) params.set('type', propertyType);

    router.push(`/propiedad?${params.toString()}`);
  };

  return (
    <Transition className="relative md:absolute md:-bottom-12 left-0 right-0 w-full md:w-[80%]  md:max-w-4xl mx-auto z-20">
      <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 backdrop-blur">

        {/* Tabs con animación */}
        <div className="relative flex gap-6 mb-6 px-2 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setOperation('Venta')}
            className={`pb-2 text-lg font-semibold transition-colors duration-300 relative z-10 ${operation === 'Venta' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Venta
          </button>
          <button
            type="button"
            onClick={() => setOperation('Alquiler')}
            className={`pb-2 text-lg font-semibold transition-colors duration-300 relative z-10 ${operation === 'Alquiler' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Alquiler
          </button>
          {/* Indicador animado */}
          <span
            className="absolute bottom-0 left-2 h-0.5 bg-gray-900 transition-all duration-300 ease-out"
            style={{
              width: operation === 'Venta' ? '50px' : '70px',
              transform: operation === 'Venta' ? 'translateX(0)' : 'translateX(74px)'
            }}
          />
        </div>

        {/* Formularios */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 md:bg-white md:border md:border-gray-200 rounded-xl p-2 md:p-0">

          {/* Campo Ubicación */}
          <div className="flex flex-col w-full md:w-1/2 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">Ubicación</label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none bg-transparent text-gray-800 font-medium focus:outline-none cursor-pointer pr-6 text-sm md:text-base"
                aria-label="Ubicación"
              >
                <option value="">Todas las zonas</option>
                {availableLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <RiArrowDownSLine className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Campo Tipo de Propiedad */}
          <div className="flex flex-col w-full md:w-1/2 px-4 py-2 border-b md:border-b-0 border-gray-200">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">Tipo de Propiedad</label>
            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full appearance-none bg-transparent text-gray-800 font-medium focus:outline-none cursor-pointer pr-6 text-sm md:text-base"
                aria-label="Tipo de Propiedad"
              >
                <option value="">Todos los tipos</option>
                {availableTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <RiArrowDownSLine className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Botón Buscar */}
          <div className="w-full md:w-auto md:ml-auto p-2 md:p-2">
            <button
              type="submit"
              className="w-full md:w-36 flex items-center justify-center gap-2 bg-main-100 hover:bg-main-200 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-md"
            >
              <RiSearch2Line size={20} />
              Buscar
            </button>
          </div>

        </form>
      </div>
    </Transition>
  );
}