import { fetchTokkoPropertyById, fetchTokkoProperties } from "@/lib/tokkoApi";
import Image from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import React from "react";
import Script from "next/script";

import { TransitionPage } from "@/components/TransitionPage";

import PropertyGallery from "@/components/PropertyGallery/PropertyGallery";
import ShareSaveActions from "@/components/ShareSaveActions/ShareSaveActions";
import DynamicPropertiesMap from "@/components/PropertiesMap/DynamicPropertiesMap";
import SimilarPropertiesCarousel from "@/components/SimilarPropertiesCarousel/SimilarPropertiesCarousel";
import { LiaRulerVerticalSolid, LiaRulerCombinedSolid, LiaDoorOpenSolid, LiaBathSolid, LiaBedSolid, LiaCalendarSolid } from "react-icons/lia";

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
  const [property, allProperties] = await Promise.all([
    fetchTokkoPropertyById(params.id),
    fetchTokkoProperties()
  ]);

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

  // Calcular propiedades similares
  let similarProperties = allProperties.filter(
    p => p.id !== property.id && p.type?.id === property.type?.id
  );
  // Si no hay suficientes del mismo tipo, rellenar con otras
  if (similarProperties.length < 3) {
    const others = allProperties.filter(
      p => p.id !== property.id && p.type?.id !== property.type?.id
    );
    similarProperties = [...similarProperties, ...others];
  }
  similarProperties = similarProperties.slice(0, 8);

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative mt-10">
          
          {/* Columna Izquierda (Contenido Principal) */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            
            {/* Título de la Propiedad */}
            <div className="mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
            </div>

            {/* Ubicación */}
            <div className="mb-6 flex items-center text-gray-800 text-sm font-medium">
              <TfiLocationPin className="mr-1.5 text-main-100" size={18} /> 
              <span>{property.location?.name || property.address || "Ubicación"}</span>
            </div>

            {/* Precio */}
            <div className="mb-8">
              {priceInfo?.price ? (
                <h2 className="text-4xl lg:text-5xl font-bold text-main-100 tracking-tight">
                  {priceInfo.currency === 'USD' ? 'US$' : '$'} {priceInfo.price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </h2>
              ) : (
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Consultar precio</h2>
              )}
            </div>

            {/* Icon-based minimalist stats row */}
            <div className="flex flex-wrap items-center justify-start md:justify-between border-y border-gray-100 py-6 mb-8 gap-x-8 gap-y-6">
              {parseFloat(property.total_surface) > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <LiaRulerVerticalSolid size={24} className="text-gray-800" />
                  <span className="text-[13px] font-medium text-gray-800 text-center">{property.total_surface} m² tot.</span>
                </div>
              )}
              {parseFloat(property.roofed_surface) > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <LiaRulerCombinedSolid size={24} className="text-gray-800" />
                  <span className="text-[13px] font-medium text-gray-800 text-center">{property.roofed_surface} m² cub.</span>
                </div>
              )}
              {!(parseFloat(property.total_surface) > 0) && !(parseFloat(property.roofed_surface) > 0) && parseFloat(property.surface) > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <LiaRulerCombinedSolid size={24} className="text-gray-800" />
                  <span className="text-[13px] font-medium text-gray-800 text-center">{property.surface} m²</span>
                </div>
              )}
              {property.room_amount > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <LiaDoorOpenSolid size={24} className="text-gray-800" />
                  <span className="text-[13px] font-medium text-gray-800 text-center">{property.room_amount} amb.</span>
                </div>
              )}
              {property.bathroom_amount > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <LiaBathSolid size={24} className="text-gray-800" />
                  <span className="text-[13px] font-medium text-gray-800 text-center">{property.bathroom_amount} baño{property.bathroom_amount !== 1 && 's'}</span>
                </div>
              )}
              {property.suite_amount > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <LiaBedSolid size={24} className="text-gray-800" />
                  <span className="text-[13px] font-medium text-gray-800 text-center">{property.suite_amount} dorm.</span>
                </div>
              )}
              {property.age >= 0 && (
                <div className="flex flex-col items-center gap-2">
                  <LiaCalendarSolid size={24} className="text-gray-800" />
                  <span className="text-[13px] font-medium text-gray-800 text-center">{property.age === 0 ? 'A estrenar' : `${property.age} años`}</span>
                </div>
              )}
            </div>

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
              <div className="mt-2 text-justify">
                <RichTextRenderer htmlContent={property.rich_description || property.description} />
              </div>
            )}

            {/* Bloque completo de especificaciones */}
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

            {/* Mapa de Ubicación */}
            {property.geo_lat && property.geo_long && (
              <div className="mt-16 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Ubicación en el Mapa</h3>
                <DynamicPropertiesMap properties={[property]} showPopup={false} />
              </div>
            )}

          </div>

          {/* Columna Derecha (Precio, Acciones, Contacto - Sticky Sidebar) */}
          <div className="lg:col-span-1 flex flex-col relative">
            <div className="sticky top-32">
              
              {/* Top: Save & Share */}
              <div className="mb-6 flex items-center justify-end h-6">
                 <ShareSaveActions propertyTitle={title} />
              </div>

              {/* Tarjeta de Contacto */}
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col gap-6">
                <h3 className="text-sm font-bold text-gray-900">Agente a cargo</h3>
                <div className="flex items-center gap-4">
                  {property.producer?.picture ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden relative border border-gray-100 shrink-0">
                      <Image src={property.producer.picture} alt="Agente" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
                      <FiUser size={24}/>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Agente Inmobiliario</span>
                    <span className="text-base font-bold text-gray-900 leading-none mt-1">{property.producer?.name || 'Inmobiliaria Bobadilla'}</span>
                  </div>
                </div>
                
                <a
                  href={`https://wa.me/5492994213223?text=${encodeURIComponent(`¡Hola! Consulto por la propiedad: ${title} (ID: ${params.id})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-main-100 text-white text-sm font-semibold py-3.5 px-4 rounded-xl hover:bg-main-200 transition-colors shadow-md hover:shadow-lg"
                >
                  Contactar por WhatsApp
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Propiedades Similares */}
        {similarProperties.length > 0 && (
          <SimilarPropertiesCarousel properties={similarProperties} />
        )}

      </main>
    </div>
  );
}