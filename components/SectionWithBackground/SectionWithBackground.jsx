'use client';

import React from 'react';

/**
 * SectionWithBackground
 * Componente reutilizable para unificar visualmente las secciones con imagen y degradado.
 * 
 * @param {string} backgroundImage - URL de la imagen de fondo (opcional)
 * @param {string} overlayColor - Color hex del degradado (ej: '#000000' o '#4c002b')
 * @param {string} gradientDirection - Dirección del degradado (ej: 'to right', 'to bottom')
 * @param {string} startOpacity - Opacidad inicial del degradado (donde empieza más oscuro)
 * @param {string} endOpacity - Opacidad final del degradado (donde termina más claro)
 */
export default function SectionWithBackground({
  backgroundImage,
  overlayColor = '#000000',
  gradientDirection = 'to right',
  startOpacity = '0.9',
  endOpacity = '0.2',
  className = '',
  children
}) {
  // Convertir color hex a RGB para poder usar rgba() en el gradiente
  const hexToRgb = (hex) => {
    let hexValue = hex.replace('#', '');
    if (hexValue.length === 3) {
      hexValue = hexValue.split('').map(x => x + x).join('');
    }
    const r = parseInt(hexValue.substring(0, 2), 16) || 0;
    const g = parseInt(hexValue.substring(2, 4), 16) || 0;
    const b = parseInt(hexValue.substring(4, 6), 16) || 0;
    return `${r}, ${g}, ${b}`;
  };

  const rgbColor = hexToRgb(overlayColor);

  return (
    <div 
      className={`relative bg-cover bg-center overflow-hidden flex flex-col ${className}`}
      style={{ 
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'none',
        backgroundColor: !backgroundImage ? overlayColor : 'transparent'
      }}
    >
      {/* Capa de overlay con linear-gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${gradientDirection}, rgba(${rgbColor}, ${startOpacity}), rgba(${rgbColor}, ${endOpacity}))`
        }}
      />
      
      {/* Contenedor del contenido por encima del overlay */}
      <div className="relative z-10 w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
