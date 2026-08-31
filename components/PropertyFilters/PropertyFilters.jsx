'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PropertyFilters({ operationFixed }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [operation, setOperation] = useState(operationFixed || searchParams.get('operation') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('rooms') || '');

  // Actualiza la URL cuando cambian los filtros
  const applyFilters = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (operation && !operationFixed) params.set('operation', operation);
    if (propertyType) params.set('type', propertyType);
    if (bedrooms) params.set('rooms', bedrooms);
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    if (!operationFixed) setOperation('');
    setPropertyType('');
    setBedrooms('');
    router.push(pathname);
  };

  return (
    <form onSubmit={applyFilters} className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4 items-end">
      
      {!operationFixed && (
        <div className="flex flex-col w-full flex-1">
          <label className="text-sm font-semibold text-gray-700 mb-1">Operación</label>
          <select 
            value={operation} 
            onChange={(e) => setOperation(e.target.value)}
            className="p-2 border rounded-md focus:ring-main-100 focus:border-main-100"
          >
            <option value="">Todas</option>
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
        </div>
      )}

      <div className="flex flex-col w-full flex-1">
        <label className="text-sm font-semibold text-gray-700 mb-1">Tipo de Propiedad</label>
        <select 
          value={propertyType} 
          onChange={(e) => setPropertyType(e.target.value)}
          className="p-2 border rounded-md focus:ring-main-100 focus:border-main-100"
        >
          <option value="">Todos</option>
          <option value="Casa">Casa</option>
          <option value="Departamento">Departamento</option>
          <option value="Terreno">Terreno / Lote</option>
          <option value="Local comercial">Local comercial</option>
          <option value="Oficina">Oficina</option>
        </select>
      </div>

      <div className="flex flex-col w-full flex-1">
        <label className="text-sm font-semibold text-gray-700 mb-1">Dormitorios</label>
        <select 
          value={bedrooms} 
          onChange={(e) => setBedrooms(e.target.value)}
          className="p-2 border rounded-md focus:ring-main-100 focus:border-main-100"
        >
          <option value="">Cualquiera</option>
          <option value="1">1 o más</option>
          <option value="2">2 o más</option>
          <option value="3">3 o más</option>
          <option value="4">4 o más</option>
        </select>
      </div>

      <div className="flex w-full md:w-auto min-w-[200px] gap-2">
        <button 
          type="submit" 
          className="flex-1 bg-main-100 hover:bg-main-200 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Filtrar
        </button>
        <button 
          type="button" 
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md transition-colors"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}
