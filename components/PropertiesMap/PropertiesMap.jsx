'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';
import Image from 'next/image';
import { Location } from 'akar-icons';
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";

// Fix Leaflet's default icon path issues with Next.js (just in case we fallback)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom bordo pin icon using L.divIcon
const createCustomIcon = () => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7b2c3a" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3" fill="white" />
    </svg>
  `;
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="width: 36px; height: 36px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">${svgIcon}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

// Component to handle auto-centering the map bounds
const MapBoundsComponent = ({ properties }) => {
  const map = useMap();
  
  useEffect(() => {
    if (properties.length === 0) return;
    
    // Extract lat/lng array
    const validCoords = properties
      .filter(p => p.geo_lat && p.geo_long)
      .map(p => [parseFloat(p.geo_lat), parseFloat(p.geo_long)]);
      
    if (validCoords.length === 0) return;

    if (validCoords.length === 1) {
      // If only one property, center and set specific zoom
      map.setView(validCoords[0], 15);
    } else {
      // If multiple, fit bounds
      const bounds = L.latLngBounds(validCoords);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [properties, map]);

  return null;
};

import PropertyCard from "@/components/PropertyCard/PropertyCard";

const PropertyMarker = ({ property, customIcon, showPopup }) => {
  const markerRef = useRef(null);
  const timerRef = useRef(null);

  // Si showPopup es falso (por ej. en la pagina de la propiedad), solo renderizar el Marker plano.
  if (!showPopup) {
    return (
      <Marker 
        position={[parseFloat(property.geo_lat), parseFloat(property.geo_long)]}
        icon={customIcon}
      />
    );
  }

  const handleMouseOver = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (window.matchMedia('(hover: hover)').matches && markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  const handleMouseOut = () => {
    if (window.matchMedia('(hover: hover)').matches && markerRef.current) {
      timerRef.current = setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.closePopup();
        }
      }, 400); // 400ms delay to allow moving mouse to popup
    }
  };

  return (
    <Marker 
      position={[parseFloat(property.geo_lat), parseFloat(property.geo_long)]}
      icon={customIcon}
      ref={markerRef}
      eventHandlers={{
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      }}
    >
      <Popup className="custom-popup" closeButton={false}>
        <div 
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          className="w-[240px] sm:w-[260px]"
        >
          <PropertyCard property={property} layout="map" />
        </div>
      </Popup>
    </Marker>
  );
};

export default function PropertiesMap({ properties, showPopup = true }) {
  // Filter out properties missing lat/lng
  const validProperties = properties.filter(p => {
    const hasCoords = p.geo_lat && p.geo_long;
    if (!hasCoords) {
      console.warn(`Propiedad excluida del mapa por falta de coordenadas: ${p.id} - ${p.publication_title}`);
    }
    return hasCoords;
  });

  const customIcon = createCustomIcon();
  
  const aspectClass = showPopup ? 'aspect-[9/16] md:aspect-video' : 'aspect-video';

  return (
    <div className={`w-full ${aspectClass} overflow-hidden shadow-sm border border-gray-200 z-0 relative`}>
      <MapContainer 
        center={[-38.9516, -68.0591]} 
        zoom={12} 
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; Google Maps'
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        />
        
        <MapBoundsComponent properties={validProperties} />
        
        <>
          {validProperties.map(property => (
            <PropertyMarker key={property.id} property={property} customIcon={customIcon} showPopup={showPopup} />
          ))}
        </>
      </MapContainer>
      
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 0.5rem !important;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          line-height: normal !important;
        }
        .leaflet-popup-tip-container {
          display: none; /* Hide tip for cleaner look */
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
