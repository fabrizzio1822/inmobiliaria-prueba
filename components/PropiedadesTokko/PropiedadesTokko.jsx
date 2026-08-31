'use client';
import FeaturedPropertyCard from "../PropertyCard/FeaturedPropertyCard";
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Propiedades({ properties = [], limit }) {
  const propiedadesAMostrar = limit ? properties.slice(0, limit) : properties;

  const filters = [
    { name: "Casas", href: "/propiedad?type=casa" },
    { name: "Departamentos", href: "/propiedad?type=departamento" },
    { name: "Terrenos", href: "/propiedad?type=terreno" },
    { name: "Venta", href: "/propiedad?operation=venta" },
    { name: "Alquiler", href: "/propiedad?operation=alquiler" },
  ];

  return (
    <div className="w-full px-8 my-5 py-4 relative">
      {/* Encabezado: Badges a la izquierda */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        {/* Badges de filtros rápidos */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start w-full gap-2">
          {filters.map((filter, index) => (
            <Link
              key={index}
              href={filter.href}
              className="bg-slate-900/50 hover:bg-main-100 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors shadow-sm"
            >
              {filter.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Grilla de propiedades (Desktop: 4x2) */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {propiedadesAMostrar.map((property) => (
          <div key={property.id} className="h-full">
            <FeaturedPropertyCard property={property} />
          </div>
        ))}
      </div>

      {/* Carrusel de propiedades (Mobile/Tablet) */}
      <div className="block lg:hidden relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-button-prev-mobile',
            nextEl: '.swiper-button-next-mobile',
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 24 },
          }}
          className="pb-4"
        >
          {propiedadesAMostrar.map((property) => (
            <SwiperSlide key={property.id} className="h-auto">
              <FeaturedPropertyCard property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Controles de navegación personalizados debajo del carrusel */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="swiper-button-prev-mobile w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-main-100 hover:text-white transition-all shadow-sm text-gray-700 focus:outline-none">
            <FaArrowLeft size={16} />
          </button>
          <button className="swiper-button-next-mobile w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-main-100 hover:text-white transition-all shadow-sm text-gray-700 focus:outline-none">
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}