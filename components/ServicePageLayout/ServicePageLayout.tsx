'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, House } from 'lucide-react';
import { servicesData } from '@/data/services';
import Modal from '@/components/modal/Modal';
import { TransitionPage } from "@/components/TransitionPage";
import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  serviceId: string;
  children?: React.ReactNode;
}

export default function ServicePageLayout({ serviceId, children }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const service = servicesData[serviceId];
  
  if (!service) return null;
  return (
    <div className="bg-white min-h-screen">
      <TransitionPage />
      
      {/* 1. Breadcrumb */}
      <div className="container mx-auto px-6 pt-8 pb-4">
        <nav className="flex items-center text-xs text-gray-500 space-x-2 font-medium">
          <Link href="/" className="hover:text-main-100 transition-colors">Inicio</Link>
          <ChevronRight size={14} />
          <span className="text-gray-400 uppercase tracking-wider">Servicios</span>
          <ChevronRight size={14} />
          <span className="text-gray-900 uppercase tracking-wider">{service.titleAccent}</span>
        </nav>
      </div>

      {/* 2. Hero Editorial */}
      <section className="container mx-auto px-6 pb-16 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Izquierda: Textos y Botones */}
          <div className="flex flex-col">
            <span className="uppercase text-xs font-bold text-gray-400 tracking-[0.2em] mb-4 block">
              {service.titlePrefix}
            </span>
            {/* Se utiliza font-serif para igualar el aspecto de la referencia y mantener coherencia con la home */}
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-serif text-gray-900 leading-[1.1] mb-8">
              {service.titleAccent} <br/> <span className="italic text-main-100">Profesional</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
              {service.intro}
            </p>

            {/* Botones de acción del Hero */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
               <a 
                 href={`https://wa.me/5492990000000?text=${encodeURIComponent(service.whatsappMessage)}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800 transition-colors font-bold py-4 px-8 rounded-full shadow-lg"
               >
                 Contactar asesor
               </a>
               {service.hasModalForm && (
                 <>
                   {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
                   <button 
                     onClick={() => setIsModalOpen(true)}
                     className="inline-flex items-center justify-center bg-main-100 text-white hover:bg-main-200 transition-colors font-bold py-4 px-8 rounded-full shadow-lg"
                   >
                     Quiero mi Tasación
                   </button>
                 </>
               )}
            </div>
          </div>

          {/* Derecha: Mosaico de Imágenes */}
          <div className="grid grid-cols-2 gap-4 h-[500px] md:h-[650px]">
             {/* Imagen principal (izquierda) */}
             <div className="relative h-full w-full overflow-hidden shadow-lg">
                <Image 
                  src={service.image} 
                  alt={service.titleAccent}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority
                />
             </div>

             {/* Columna derecha del mosaico */}
             <div className="flex flex-col gap-4 h-full">
                {/* Imagen secundaria (arriba) */}
                <div className="relative h-1/2 w-full overflow-hidden shadow-lg bg-gray-100">
                   {service.secondaryImage && (
                     <Image 
                        src={service.secondaryImage} 
                        alt={`${service.titleAccent} detalle`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                   )}
                </div>

                {/* Quote Block (abajo) */}
                <div className="h-1/2 bg-main-100 p-6 md:p-8 flex flex-col justify-center shadow-lg relative overflow-hidden group">
                   <div className="absolute top-4 left-4 text-white/20 transform group-hover:scale-110 transition-transform">
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                     </svg>
                   </div>
                   <p className="text-white font-medium text-lg md:text-xl relative z-10 leading-snug">
                     &quot;{service.quote?.text}&quot;
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Estadísticas */}
      {service.statistics && service.statistics.length > 0 && (
        <section className="border-t border-b border-gray-100 py-20 bg-gray-50/50">
          <div className="container mx-auto px-6 text-center">
            <span className="uppercase text-xs font-bold text-gray-400 tracking-[0.2em] mb-4 block">
              ESTADÍSTICAS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-16">
              Resultados probados, <br className="hidden md:block" /><span className="italic text-main-100">confianza absoluta</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-200 max-w-5xl mx-auto">
              {service.statistics.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center pt-8 md:pt-0">
                   <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-4">
                     {stat.value}
                   </h3>
                   <p className="text-gray-500 font-bold tracking-wide uppercase text-sm max-w-xs">
                     {stat.label}
                   </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Servicios Ofrecidos / Tipos (Grillas) */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="uppercase text-xs font-bold text-gray-400 tracking-[0.2em] mb-4">Nuestros Servicios</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-10">Soluciones <span className="text-main-100 italic">integrales</span></h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.offeredServices.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-gray-50 p-8 rounded-none border-l-4 border-transparent hover:border-main-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col items-start group">
                    <div className="bg-white p-4 rounded-full mb-6 text-main-100 shadow-sm group-hover:bg-main-100 group-hover:text-white transition-colors">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                  </div>
                )
              })}
            </div>
          </div>

          {service.types && service.types.length > 0 && (
            <div className="mt-20 border-t border-gray-100 pt-16">
              <h2 className="uppercase text-xs font-bold text-gray-400 tracking-[0.2em] mb-4">Especialidades</h2>
              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-10">Tipos de <span className="text-main-100 italic">{service.titleAccent}</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.types.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white p-6 border border-gray-100 hover:border-main-100 transition-colors flex flex-col items-center text-center">
                      <div className="text-gray-400 mb-4">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Metodología (Stepper minimalista) */}
      <section className="py-16 md:py-24 bg-gray-900 text-white border-t-8 border-main-100">
        <div className="container mx-auto px-6">
          <h2 className="uppercase text-xs font-bold tracking-[0.2em] mb-4 text-gray-400 text-center">Proceso</h2>
          <h3 className="text-3xl md:text-4xl font-serif mb-16 text-center">Metodología de <span className="italic text-main-100">Trabajo</span></h3>
          
          <div className="flex flex-col lg:flex-row relative max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-8 left-16 right-16 h-[1px] bg-gray-800 -z-0"></div>
            
            {service.methodology.map((step, idx) => {
              const numberStr = (idx + 1).toString().padStart(2, '0');
              return (
                <div key={idx} className="flex-1 flex flex-col lg:items-center relative mb-12 lg:mb-0 group z-10">
                   {idx !== service.methodology.length - 1 && (
                    <div className="lg:hidden absolute left-8 top-16 bottom-[-3rem] w-[1px] bg-gray-800 -z-0"></div>
                   )}
                   
                   <div className="flex flex-row lg:flex-col items-start lg:items-center">
                      <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-2xl font-serif text-white mb-0 lg:mb-6 shrink-0 group-hover:border-main-100 group-hover:text-main-100 transition-colors">
                        {numberStr}
                      </div>
                      
                      <div className="ml-6 lg:ml-0 lg:text-center mt-2 lg:mt-0 px-2">
                        <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                   </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. Beneficios */}
      <section className="py-16 bg-main-100 text-white">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center p-4">
                    <div className="bg-white/10 p-4 rounded-full mb-4 backdrop-blur-sm">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-lg font-medium">{benefit.title}</h4>
                  </div>
                )
              })}
           </div>
        </div>
      </section>

      {/* Asesoramiento extra content (Properties list) */}
      {children && (
        <div className="py-12 bg-gray-50">
          {children}
        </div>
      )}

      {/* 7. Cross-sell */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="py-16 md:py-24 container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-10 text-center">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.relatedServices.map(relatedId => {
              const relatedData = servicesData[relatedId];
              if (!relatedData) return null;
              return (
                <Link key={relatedId} href={relatedData.slug} className="group flex items-center p-4 md:p-6 bg-white border border-gray-200 hover:border-gray-900 transition-colors">
                  <div className="relative w-20 h-20 overflow-hidden shrink-0 mr-6">
                    <Image src={relatedData.image} alt={relatedData.titleAccent} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Servicio</span>
                    <h3 className="text-lg font-bold text-gray-900">
                      {relatedData.titleAccent}
                    </h3>
                  </div>
                  <div className="text-gray-900 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                    <ArrowRight />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

    </div>
  );
}
