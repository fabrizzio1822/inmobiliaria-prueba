'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(
  () => import('./PropertiesMap'),
  {
    ssr: false, // Ensures Leaflet is not loaded on the server
    loading: () => (
      <div className="w-full aspect-video rounded-none overflow-hidden shadow-sm border border-gray-200 bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 text-gray-500">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-main-100 rounded-full animate-spin"></div>
          <p className="font-medium animate-pulse">Cargando mapa...</p>
        </div>
      </div>
    )
  }
);

export default function DynamicPropertiesMap({ properties, showPopup = true }) {
  return <DynamicMap properties={properties} showPopup={showPopup} />;
}
