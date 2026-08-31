import { fetchTokkoPropertyById } from "@/lib/tokkoApi";
import Image from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import React from "react";
import Script from "next/script";

import { TransitionPage } from "@/components/TransitionPage";

import PropertyGallery from "@/components/PropertyGallery/PropertyGallery";
import ShareSaveActions from "@/components/ShareSaveActions/ShareSaveActions";
import { PiWavesLight, PiMountainsLight } from "react-icons/pi"; // Ejemplo de iconos, o usar los genéricos

const RichTextRenderer = ({ htmlContent }) => {
  if (typeof htmlContent === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed" />;
  }
  return <p className="text-gray-800 leading-relaxed">{htmlContent}</p>;
};

export async function generateMetadata({ params }) {
  const property = await fetchTokkoPropertyById(params.id);
  
  if (!property) {
    return { title: 'Propiedad no encontrada | Inmobiliaria María Laura Bobadilla' };
  }

  const title = property.publication_title || `${property.type?.name || "Propiedad"} en ${property.location?.name || "Neuquén"}`;
  const bedrooms = property.suite_amount > 0 ? ` - ${property.suite_amount} dorm` : '';
  const priceInfo = property.operations?.[0]?.prices?.[0];
  const priceText = priceInfo ? ` - ${priceInfo.currency} ${priceInfo.price.toLocaleString('es-AR', {minimumFractionDigits: 0})}` : '';
  
  return {
    title: `${title}${bedrooms}${priceText} | Inmobiliaria Bobadilla`,
    description: property.description_only ? property.description_only.substring(0, 150) + '...' : `Descubre esta excelente propiedad.`,
    alternates: {
      canonical: `https://www.marialaurabobadilla.com.ar/propiedades/${params.id}`,
    }
  }
}

export default async function Propiedad({ params }) {
  const property = await fetchTokkoPropertyById(params.id);

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl text-gray-700">Propiedad no encontrada</h1>
      </div>
    );
  }

  let displaySurface = "N/D";
  if (parseFloat(property.roofed_surface) > 0) {
    displaySurface = property.roofed_surface;
  } else if (parseFloat(property.total_surface) > 0) {
    displaySurface = property.total_surface;
  } else if (parseFloat(property.surface) > 0) {
    displaySurface = property.surface;
  }

  const priceInfo = property.operations?.[0]?.prices?.[0];
  const title = property.publication_title || `${property.type?.name || "Propiedad"} en ${property.location?.name || "Ubicación"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": property.description_only,
    "image": property.photos?.map(p => p.image) || [],
    "offers": {
      "@type": "Offer",
      "priceCurrency": priceInfo?.currency || "USD",
      "price": priceInfo?.price || 0,
      "url": `https://www.marialaurabobadilla.com.ar/propiedades/${params.id}`
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TransitionPage/>
      
      <main className="w-full px-4 sm:px-6 lg:px-12 py-8 md:py-12">
        
        {/* Galería (Ancho casi completo, sin border-radius agresivo en el diseño de referencia) */}
        <div className="mb-6">
          <PropertyGallery photos={property.photos} location={property.location?.name} />
        </div>

        {/* Layout Principal 2 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative mt-10">
          
          {/* Columna Izquierda (Acciones, Precio, Contacto) */}
          <div className="flex flex-col">
            
            {/* Top: Save & Share */}
            <div className="mb-6 flex items-center h-6">
               <ShareSaveActions propertyTitle={title} />
            </div>

            {/* Título de la Propiedad */}
            <div className="mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
            </div>

            {/* Precio */}
            <div className="mb-10">
              {priceInfo?.price ? (
                <>
                  <h2 className="text-4xl lg:text-5xl font-bold text-main-100 tracking-tight">
                    {priceInfo.currency === 'USD' ? 'US$' : '$'} {priceInfo.price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </h2>
                  <a href="#contacto" className="inline-block mt-3 text-sm font-semibold text-main-100 underline underline-offset-4 decoration-2 decoration-main-100 hover:text-main-200">
                    Consultar financiación
                  </a>
                </>
              ) : (
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Consultar precio</h2>
              )}
            </div>

            {/* Tarjeta de Contacto Minimalista (alineada a la izquierda) */}
            <div className="bg-white rounded-lg shadow-[0_4px_20px_rgb(0,0,0,0.06)] p-3 lg:p-4 border border-gray-100 flex items-center justify-between max-w-sm mt-4">
              <div className="flex items-center gap-3">
                {property.producer?.picture ? (
                  <div className="w-10 h-10 rounded overflow-hidden relative border border-gray-100 shrink-0">
                    <Image src={property.producer.picture} alt="Agente" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
                    <FiUser size={20}/>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">Agente inmobiliario</span>
                  <span className="text-sm font-bold text-gray-900 leading-none mt-0.5">{property.producer?.name || 'Inmobiliaria'}</span>
                </div>
              </div>
              
              <a
                href={`https://wa.me/5492990000000?text=${encodeURIComponent(`¡Hola! Consulto por la propiedad: ${title} (ID: ${params.id})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-main-100 text-white text-xs font-semibold py-2.5 px-4 rounded hover:bg-main-200 transition-colors shadow-sm"
              >
                Contactar
              </a>
            </div>

          </div>

          {/* Columna Derecha (Ubicación, Specs, Amenities, Descripción) */}
          <div className="flex flex-col">
            
            {/* Top: Ubicación (Alineado con Save/Share) */}
            <div className="mb-6 flex items-center h-6 text-gray-800 text-sm font-medium">
              <TfiLocationPin className="mr-1.5" size={16} /> 
              <span>{property.location?.name || property.address || "Ubicación"}</span>
            </div>

            {/* Specs en línea grandes */}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-4">
              {displaySurface !== "N/D" && (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-4xl font-bold text-gray-900">{displaySurface}</span>
                  <span className="text-sm font-semibold text-gray-800">m²</span>
                </div>
              )}
              {property.room_amount > 0 && (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-4xl font-bold text-gray-900">{property.room_amount}</span>
                  <span className="text-sm font-semibold text-gray-800">ambientes</span>
                </div>
              )}
              {property.suite_amount > 0 && (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-4xl font-bold text-gray-900">{property.suite_amount}</span>
                  <span className="text-sm font-semibold text-gray-800">dorm.</span>
                </div>
              )}
              {property.bathroom_amount > 0 && (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-4xl font-bold text-gray-900">{property.bathroom_amount}</span>
                  <span className="text-sm font-semibold text-gray-800">baños</span>
                </div>
              )}
            </div>

            <a href="#caracteristicas" className="inline-block text-sm font-semibold text-main-100 underline underline-offset-4 decoration-2 decoration-main-100 hover:text-main-200 mb-8">
              Ver todas las especificaciones
            </a>

            {/* Amenities Inline (Badges) */}
            {property.tags && property.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mb-8">
                {property.tags.map((tag, idx) => (
                  <div key={tag.id || idx} className="bg-main-100/10 text-main-100 border border-main-100/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {tag.name}
                  </div>
                ))}
              </div>
            )}

            {/* Descripción */}
            {property.description_only && (
              <div className="mt-2 text-justify pr-0 lg:pr-8">
                <RichTextRenderer htmlContent={property.rich_description || property.description} />
              </div>
            )}

            {/* Bloque completo de especificaciones (Oculto o ancla abajo) */}
            <div id="caracteristicas" className="mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Especificaciones Técnicas</h3>
                <div className="flex flex-col gap-y-3 text-sm max-w-xl">
                    {property.age >= 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Antigüedad</span>
                        <span className="font-bold text-gray-900">{property.age === 0 ? 'A estrenar' : `${property.age} años`}</span>
                      </div>
                    )}
                    {property.orientation && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Orientación</span>
                        <span className="font-bold text-gray-900">{property.orientation}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Tipo de propiedad</span>
                        <span className="font-bold text-gray-900">{property.type?.name || 'N/A'}</span>
                    </div>
                    {displaySurface !== "N/D" && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Superficie Total</span>
                          <span className="font-bold text-gray-900">{displaySurface} m²</span>
                      </div>
                    )}
                </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}