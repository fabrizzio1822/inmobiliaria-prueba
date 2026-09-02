'use client'

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Building2, TrendingUp, Award } from 'lucide-react';
import { servicesData } from '@/data/services';
import { TransitionPage } from "@/components/TransitionPage";

export default function ServicePageLayout({ serviceId, children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const service = servicesData[serviceId];

  if (!service) return null;

  // Imágenes genéricas por si faltan en la DB
  const fallbackImages = [
    "/assets/tasacion.jpg",
    "/assets/evaluacion-proyectos.jpg",
    "/assets/planos.jpg",
    "/assets/papeles.jpg"
  ];

  const whatsappHref = `https://wa.me/5492994213223?text=${encodeURIComponent(
    service.whatsappMessage ?? ''
  )}`;

  return (
    <div className="bg-white min-h-screen">
      <TransitionPage />

      {/* SECTION 1: New Hero (2 Columns, Light bg) */}
      <div className="bg-white pb-20 lg:pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center pb-6">

            {/* Left Column: Text & CTA */}
            <div className="flex flex-col items-start">

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-serif text-gray-900 leading-[1.1] mb-6">
                {service.titlePrefix}{' '}
                <br className="hidden lg:block" />
                <span className="text-main-100 italic">
                  {service.titleAccent}
                </span>.
              </h1>

              {/* Intro */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                {service.intro}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-16">

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-main-100 text-white font-bold py-4 px-8 rounded-full hover:bg-main-200 transition-colors flex items-center justify-center gap-2 shadow-xl"
                >
                  Contactarme
                  <ArrowRight size={18} />
                </a>



              </div>



            </div>

            {/* Right Column: Single Large Image */}
            <div className="relative h-[500px] md:h-[650px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src={service.image || fallbackImages[0]}
                alt={service.titleAccent ?? 'Imagen del servicio'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Statistics */}
        <div className="bg-main-100 text-white py-12 md:py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-start lg:justify-center gap-4 group">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 transition-all">
                  <Building2 className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-lg md:text-xl text-white font-medium leading-snug">
                  Martillera y Corredora Pública
                </span>
              </div>
              <div className="flex items-center justify-start lg:justify-center gap-4 group">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 transition-all">
                  <TrendingUp className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-lg md:text-xl text-white font-medium leading-snug">
                  Experiencia financiera <br className="hidden lg:block" />+ visión de negocios
                </span>
              </div>
              <div className="flex items-center justify-start lg:justify-center gap-4 group">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 transition-all">
                  <Award className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-lg md:text-xl text-white font-medium leading-snug">
                  Coach Ejecut. certif. por ICF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: About Us */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              <div className="relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={service.secondaryImage || fallbackImages[1]}
                  alt="Sobre nosotros"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

              </div>

              <div className="flex flex-col">

                <span className="text-main-100 font-bold text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-main-100"></div>
                  SOBRE MÍ
                </span>

                <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                  Donde la calidad encuentra el{' '}
                  <span className="text-main-100 italic">
                    compromiso
                  </span>.
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {service.quote?.text ||
                    "Creo en brindar un servicio que genera tranquilidad y confianza. Por eso trato cada operación con cuidado, respeto y atención al detalle."}
                </p>

                {service.offeredServices &&
                  service.offeredServices.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">

                      {service.offeredServices.map((offered, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle2
                            className="text-main-100 shrink-0"
                            size={20}
                          />

                          <span className="text-gray-800 font-medium text-sm">
                            {offered.title}
                          </span>
                        </div>
                      ))}

                    </div>
                  )}

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-main-100 text-white font-bold py-3 px-8 rounded-full hover:bg-main-200 transition-colors inline-flex items-center justify-center gap-2 self-start text-sm"
                >
                  Solicitar cotización
                  <ArrowRight size={16} />
                </a>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Why Choose Us */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              <div className="flex flex-col order-2 lg:order-1">

                <span className="text-main-100 font-bold text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-main-100"></div>
                  POR QUÉ ELEGIR MIS SERVICIOS
                </span>

                <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight max-w-md">
                  Un servicio que va más allá de las{' '}
                  <span className="text-main-100 italic">
                    expectativas
                  </span>.
                </h2>

                <p className="text-gray-600 mb-10 leading-relaxed text-lg max-w-md">
                  Combino experiencia, confiabilidad y atención al detalle
                  para ofrecer un servicio inmobiliario excepcional. Estoy
                  dedicada a hacer que cada operación sea impecable,
                  puntual y con la completa satisfacción del cliente.
                </p>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-main-100 text-white font-bold py-3 px-8 rounded-full hover:bg-main-200 transition-colors inline-flex items-center justify-center gap-2 self-start text-sm shadow-xl"
                >
                  Contactar
                  <ArrowRight size={16} />
                </a>

              </div>

              {service.benefits &&
                service.benefits.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 lg:order-2">

                    {service.benefits
                      .slice(0, 4)
                      .map((benefit, idx) => {

                        const Icon = benefit.icon;
                        const isDark = idx === 0 || idx === 3;

                        return (
                          <div
                            key={idx}
                            className={`${isDark
                              ? 'bg-main-100 text-white'
                              : 'bg-white text-gray-900 border border-gray-100'
                              } p-8 rounded-3xl shadow-sm flex flex-col items-start`}
                          >

                            {/* Icon */}
                            {Icon && (
                              <Icon
                                size={28}
                                strokeWidth={1.5}
                                className={`mb-6 ${isDark
                                  ? 'text-white'
                                  : 'text-main-100'
                                  }`}
                              />
                            )}

                            <h3 className="font-bold text-lg mb-3">
                              {benefit.title}
                            </h3>

                            <p
                              className={`text-sm leading-relaxed ${isDark
                                ? 'text-white/80'
                                : 'text-gray-500'
                                }`}
                            >
                              Me aseguro de entregar resultados
                              profesionales en cada paso.
                            </p>

                          </div>
                        );
                      })}

                  </div>
                )}

            </div>
          </div>
        </section>

        {/* Dynamic Content (Properties List) */}
        {children && (
          <div className="bg-white py-20">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}

