'use client';

import React, { useState } from 'react';
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import DynamicPropertiesMap from "@/components/PropertiesMap/DynamicPropertiesMap";
import { LayoutGrid, Map, Menu } from 'lucide-react';

export default function PropertiesViewToggle({ properties }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'row' or 'map'

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Toggle Button - Desktop */}
      <div className="hidden sm:flex justify-center mb-10">
        <div className="bg-gray-100 p-1 rounded-full inline-flex relative shadow-sm border border-gray-200">
          <button 
            onClick={() => setViewMode('grid')}
            className={`
              relative z-10 flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300
              ${viewMode === 'grid' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <LayoutGrid size={18} />
            <span>Grilla</span>
          </button>
          
          <button 
            onClick={() => setViewMode('row')}
            className={`
              relative z-10 flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300
              ${viewMode === 'row' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <Menu size={18} />
            <span>Filas</span>
          </button>
          
          <button 
            onClick={() => setViewMode('map')}
            className={`
              relative z-10 flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300
              ${viewMode === 'map' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <Map size={18} />
            <span>Mapa</span>
          </button>

          {/* Animated Background Pill */}
          <div 
            className={`absolute top-1 bottom-1 bg-gray-900 rounded-full transition-all duration-300 ease-in-out shadow-sm`}
            style={{ 
              width: 'calc(33.33% - 2.66px)',
              left: viewMode === 'grid' ? '4px' : viewMode === 'row' ? 'calc(33.33% + 1.33px)' : 'calc(66.66% - 1.33px)'
            }}
          ></div>
        </div>
      </div>

      {/* Toggle Button - Mobile (No Row Option) */}
      <div className="flex sm:hidden justify-center mb-10 w-full px-6">
        <div className="bg-gray-100 p-1 rounded-full inline-flex relative shadow-sm border border-gray-200 w-full max-w-[300px]">
          <button 
            onClick={() => setViewMode(viewMode === 'row' ? 'grid' : 'grid')}
            className={`
              flex-1 relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300
              ${viewMode === 'grid' || viewMode === 'row' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <LayoutGrid size={18} />
            <span>Grilla</span>
          </button>
          
          <button 
            onClick={() => setViewMode('map')}
            className={`
              flex-1 relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300
              ${viewMode === 'map' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <Map size={18} />
            <span>Mapa</span>
          </button>

          {/* Animated Background Pill Mobile */}
          <div 
            className={`absolute top-1 bottom-1 bg-gray-900 rounded-full transition-all duration-300 ease-in-out shadow-sm`}
            style={{ 
              width: 'calc(50% - 4px)',
              left: viewMode === 'map' ? 'calc(50% + 2px)' : '4px'
            }}
          ></div>
        </div>
      </div>

      {/* Render View */}
      {properties.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xl w-full">
          No se encontraron propiedades con esos filtros.
        </div>
      ) : (
        <div className="w-full">
          <div className="text-center mb-6 text-gray-500 font-medium">
            Mostrando {properties.length} propiedade{properties.length !== 1 ? 's' : ''}
          </div>
          {viewMode === 'map' ? (
            <div className="container mx-auto px-6 mb-10">
               <DynamicPropertiesMap properties={properties} />
            </div>
          ) : (
            <div className={`container mx-auto px-6 mb-10 py-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-6 w-full'}`}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} layout={viewMode} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
