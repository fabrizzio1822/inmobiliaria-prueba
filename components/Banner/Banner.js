'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, TrendingUp, Award } from 'lucide-react';
import FloatedSearch from "../FloatedSearch/FloatedSearch";

export default function Banner({ properties = [] }) {
  // Las imágenes para desktop y mobile
  const slides = [
    { desktop: '/assets/hero-4.jpg', mobile: '/assets/hero-1-mobile.jpg' },
    { desktop: '/assets/hero-31.jpg', mobile: '/assets/hero-2-mobile.jpg' },
    { desktop: '/assets/hero-21.jpg', mobile: '/assets/hero-3-mobile.jpg' }
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full relative mb-16 md:px-6">
      {/* Banner sin margen top y con radius solo abajo */}
      <div className="w-full min-h-[95vh] relative flex flex-col">

        {/* Capa de fondo separada para mantener el overflow-hidden sin recortar el buscador */}
        <div className="absolute inset-0 overflow-hidden rounded-b-[2rem] lg:rounded-b-[3rem] z-0">
          {/* Carrusel de fondos */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Fondo Desktop */}
              <div
                className="hidden md:block absolute inset-0 bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.desktop}')` }}
              />
              {/* Fondo Mobile */}
              <div
                className="block md:hidden absolute inset-0 bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.mobile}')` }}
              />
            </div>
          ))}

          {/* Capa de oscurecimiento sutil para legibilidad del texto */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        </div>

        {/* Contenedor del texto (padding reducido en mobile) */}
        <div className="relative z-10 w-full pt-28 px-6 md:pt-48 md:px-16 lg:px-24">
          <h1 className="font-serif text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Encontrá el lugar donde empieza tu <span className="italic font-medium">próxima etapa</span>
          </h1>
          <p className="hidden md:block mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-lg font-medium">
            Descubrí oportunidades pensadas para cada momento, con información clara y acompañamiento profesional de principio a fin.
          </p>
        </div>

        {/* Espaciador flexible para empujar el buscador hacia abajo */}
        <div className="relative z-20 w-full mt-auto mb-8 md:mb-12 lg:mb-20 md:flex md:justify-center px-2 sm:px-4 pb-8">
          <FloatedSearch properties={properties} />
        </div>

        {/* Sección de Estadísticas en el fondo del banner (Desktop/Tablet) */}
        <div className="hidden md:block relative z-20 w-full px-8 md:px-16 lg:px-24 pb-8 md:pb-12 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white pt-6 border-t border-white/20">
            <div className="flex items-center justify-center md:justify-start lg:justify-center gap-4 group">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 group-hover:bg-main-100 group-hover:border-main-100 transition-colors">
                <Building2 className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-sm md:text-base lg:text-lg text-white/90 font-medium leading-snug">
                Martillera y Corredora Pública
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-center gap-4 group">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 group-hover:bg-main-100 group-hover:border-main-100 transition-colors">
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-sm md:text-base lg:text-lg text-white/90 font-medium leading-snug">
                Experiencia financiera <br className="hidden lg:block" />+ visión de negocios
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-end lg:justify-center gap-4 group">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 group-hover:bg-main-100 group-hover:border-main-100 transition-colors">
                <Award className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-sm md:text-base lg:text-lg text-white/90 font-medium leading-snug">
                Coach Ejecut. certif. por ICF
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Estadísticas extraída para Mobile */}
      <div className="block md:hidden w-full max-w-[1400px] mx-auto px-6 pt-10 pb-4">
        <div className="grid grid-cols-1 gap-6 text-gray-900">
          <div className="flex items-center justify-start gap-4 group">
            <div className="p-3 bg-gray-100 rounded-xl border border-gray-200 group-hover:bg-main-100 group-hover:border-main-100 transition-colors">
              <Building2 className="w-6 h-6 text-gray-700 group-hover:text-white" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium leading-snug">
              Martillera y Corredora Pública
            </span>
          </div>
          <div className="flex items-center justify-start gap-4 group">
            <div className="p-3 bg-gray-100 rounded-xl border border-gray-200 group-hover:bg-main-100 group-hover:border-main-100 transition-colors">
              <TrendingUp className="w-6 h-6 text-gray-700 group-hover:text-white" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium leading-snug">
              Experiencia financiera + visión de negocios
            </span>
          </div>
          <div className="flex items-center justify-start gap-4 group">
            <div className="p-3 bg-gray-100 rounded-xl border border-gray-200 group-hover:bg-main-100 group-hover:border-main-100 transition-colors">
              <Award className="w-6 h-6 text-gray-700 group-hover:text-white" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium leading-snug">
              Coach Ejecut. certif. por ICF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}