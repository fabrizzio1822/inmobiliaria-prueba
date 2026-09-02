'use client';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function AboutSection({ totalProperties = 0 }) {
  return (
    <section className="w-full bg-main-100 text-white py-16 md:py-24 px-8 md:px-16 lg:px-24 relative overflow-hidden font-sans rounded-[2rem] lg:rounded-[3rem]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 w-full mb-16 md:mb-20">
        <div className="w-full lg:w-1/3 shrink-0">
          <h2 className="text-xs font-medium tracking-[0.15em] text-gray-300 uppercase flex items-center gap-3">
            <span className="w-2 h-2 bg-gray-400 rounded-full block"></span>
            MARÍA LAURA BOBADILLA
          </h2>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col justify-center">
          <h3 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-light tracking-tight mb-6 max-w-3xl">
            Construyendo patrimonio,<br className="hidden lg:block" /> proyectos y futuro
          </h3>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl font-light leading-relaxed">
            Te acompaño en la compra, venta y alquiler de tu propiedad, y también en tasaciones y peritajes, con asesoramiento cercano en cada paso.
          </p>
        </div>
      </div>
      <hr className="border-gray-500/30 w-full mb-12 md:mb-16" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full">
        <div className="flex flex-col">
          <span className="text-5xl lg:text-[64px] font-medium tracking-tight mb-2 lg:mb-4">3+</span>
          <span className="text-sm text-gray-400 tracking-wide font-light">Años de experiencia</span>
        </div>
        <div className="flex flex-col">
          <span className="text-5xl lg:text-[64px] font-medium tracking-tight mb-2 lg:mb-4">{totalProperties}</span>
          <span className="text-sm text-gray-400 tracking-wide font-light">Propiedades disponibles</span>
        </div>
        <div className="flex flex-col">
          <span className="text-5xl lg:text-[64px] font-medium tracking-tight mb-2 lg:mb-4">10+</span>
          <span className="text-sm text-gray-400 tracking-wide font-light">Familias felices</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl lg:text-[40px] font-medium tracking-tight mb-2 lg:mb-4 leading-tight">Neuquén y<br />Patagonia</span>
          <span className="text-sm text-gray-400 tracking-wide font-light mt-1">Zona de cobertura</span>
        </div>
      </div>
    </section>
  );
}
