import React from 'react';

export default function LoadingPropiedad() {
  return (
    <div className="bg-white min-h-screen">
      <main className="w-full px-4 sm:px-6 lg:px-12 py-8 md:py-12 animate-pulse">
        
        {/* Galería skeleton */}
        <div className="mb-6 h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-200 rounded-2xl w-full"></div>

        {/* Layout Principal 2 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative mt-10">
          
          {/* Columna Izquierda */}
          <div className="flex flex-col">
            <div className="mb-6 h-6 w-32 bg-gray-200 rounded"></div>
            
            {/* Título */}
            <div className="mb-4 h-10 w-3/4 bg-gray-200 rounded"></div>
            <div className="mb-4 h-10 w-1/2 bg-gray-200 rounded"></div>
            
            {/* Precio */}
            <div className="mb-10 mt-6 h-12 w-48 bg-gray-200 rounded"></div>

            {/* Tarjeta de Contacto */}
            <div className="bg-gray-100 rounded-lg p-4 border border-gray-100 h-20 max-w-sm mt-4"></div>
          </div>

          {/* Columna Derecha */}
          <div className="flex flex-col">
            {/* Ubicación */}
            <div className="mb-6 h-6 w-1/2 bg-gray-200 rounded"></div>

            {/* Specs */}
            <div className="flex gap-6 mb-8">
              <div className="h-10 w-20 bg-gray-200 rounded"></div>
              <div className="h-10 w-20 bg-gray-200 rounded"></div>
              <div className="h-10 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-3 mb-8">
               <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
               <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
               <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
            </div>

            {/* Descripción */}
            <div className="space-y-3 mt-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
