import { fetchTokkoPropertyById } from "@/lib/tokkoApi";
// import Image from "next/image"; // No se usa directamente, PhotoSlider lo maneja
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid, LiaTagSolid } from "react-icons/lia";
import { TfiLocationPin } from "react-icons/tfi";
import { FiPhone, FiMail, FiUser } from "react-icons/fi"; // Iconos para contacto
import PhotoSlider from "@/components/PhotoSlider/PhotoSlider";
import React from "react";

import { Badge } from "@/components/ui/badge"; // Asumo que es de shadcn/ui o similar
import Form from "@/components/Form/Form";
import { TransitionPage } from "@/components/TransitionPage";


// Helper para limpiar la descripción y manejar el HTML si es necesario
const RichTextRenderer = ({ htmlContent }) => {

  if (typeof htmlContent === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700" />;
  }
  return <p className="text-gray-700">{htmlContent}</p>;
};


export default async function Propiedad({ params }) {
  const property = await fetchTokkoPropertyById(params.id);

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl text-gray-700">Propiedad no encontrada</h1>
      </div>
    );
  }

  // Determinar la superficie a mostrar
  let displaySurface = "N/D";
  if (parseFloat(property.roofed_surface) > 0) {
    displaySurface = `${property.roofed_surface} m² (cubierta)`;
  } else if (parseFloat(property.total_surface) > 0) {
    displaySurface = `${property.total_surface} m² (total)`;
  } else if (parseFloat(property.surface) > 0) {
    displaySurface = `${property.surface} m²`;
  }

  const operationType = property.operations?.[0]?.operation_type;
  const priceInfo = property.operations?.[0]?.prices?.[0];

  return (
    <div>
      <TransitionPage/>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado de la Propiedad */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
              {property.publication_title || `${property.type?.name || "Propiedad"} en ${property.location?.name || "Ubicación"}`}
            </h1>
            {operationType && (
              <Badge 
                className="max-w-[65px] text-sm font-semibold whitespace-nowrap bg-main-100 text-white" // Ajusta bg-bordo
              >
                {operationType}
              </Badge>
            )}
          </div>
          <div className="flex items-center text-gray-600 text-sm sm:text-base">
            <TfiLocationPin className="mr-2 text-bordo" size={20} /> 
            <span>{property.address || property.location?.full_location || "Ubicación no especificada"}</span>
          </div>
        </div>

        {/* Layout Principal: Galería y Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda (Galería y Descripción) */}
          <div className="lg:col-span-2">
            {property.photos && property.photos.length > 0 ? (
              <div className="mb-6 rounded-lg overflow-hidden ">
                <PhotoSlider photos={property.photos} />
              </div>
            ) : (
              <div className="mb-6 w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 shadow-lg">
                No hay imágenes disponibles
              </div>
            )}

            {/* Características Principales Iconos */}
            <div className="mb-6 p-4  rounded-lg ">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Características Principales</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {property.type?.name && (
                   <div className="flex items-center text-gray-600">
                     <LiaTagSolid className="mr-2 text-bordo" size={20}/> {property.type.name}
                   </div>
                   
                )}
                {property.suite_amount > 0 && (
                  <div className="flex items-center text-gray-600">
                    <LiaBedSolid className="mr-2 text-bordo" size={20}/> {property.suite_amount} Dormitorio(s)
                  </div>
                )}
                {property.bathroom_amount > 0 && (
                  <div className="flex items-center text-gray-600">
                    <LiaBathSolid className="mr-2 text-bordo" size={20}/> {property.bathroom_amount} Baño(s)
                  </div>
                )}
                {property.room_amount > 0 && (
                  <div className="flex items-center text-gray-600">
                    {/* Puedes usar un ícono genérico para ambientes si lo tienes */}
                    <LiaRulerCombinedSolid className="mr-2 text-bordo" size={20}/> {property.room_amount} Ambiente(s)
                  </div>
                )}
                {displaySurface !== "N/D" && (
                  <div className="flex items-center text-gray-600">
                    <LiaRulerCombinedSolid className="mr-2 text-bordo" size={20}/> {displaySurface}
                  </div>
                )}
                 {property.age > 0 && (
                  <div className="flex items-center text-gray-600">
                    {/* Icono para antigüedad */}
                    <LiaRulerCombinedSolid className="mr-2 text-bordo" size={20}/> {property.age} años antigüedad
                  </div>
                )}
              </div>
            </div>
            <hr />
            {/* Descripción */}
            {property.description_only && (
              <div className="mb-6 p-4 bg-white ">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Descripción</h3>
                {/* Usar la descripción con HTML si existe (description_only), sino la plana */}
                <RichTextRenderer htmlContent={property.rich_description || property.description} />
              </div>
            )}
            <hr />
            {/* Otras Características / Tags */}
            {property.tags && property.tags.length > 0 && (
              <div className="mb-6 p-4 ">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Comodidades y Servicios</h3>
                <div className="flex flex-wrap gap-2">
                  {property.tags.map((tag) => (
                    <Badge key={tag.id} variant="outline" className="text-sm border-bordo text-bordo-dark"> {/* Ajusta colores */}
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha (Precio y Contacto) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Precio */}
            {priceInfo?.price && (
              <div className="p-6 bg-bordo/10 rounded-lg shadow-md text-center"> {/* Ajusta bg-bordo/10 */}
                <p className="text-sm text-bordo-dark font-medium mb-1">{operationType || "Precio"}</p>
                <p className="text-3xl font-bold text-bordo">
                  {priceInfo.price.toLocaleString('es-AR', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0, // Sin decimales para precios grandes
                  })}
                  <span className="text-xl ml-1">{priceInfo.currency}</span>
                </p>
                {property.expenses > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                        Expensas: {property.expenses.toLocaleString('es-AR', { style: 'currency', currency: priceInfo.currency === 'USD' ? 'USD' : 'ARS', minimumFractionDigits: 0 })}
                    </p>
                )}
              </div>
            )}
            

            {/* Información del Agente/Productor */}
            {property.producer && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                  Publicado por
                </h3>
                <div className="flex items-center mb-4">
                  {property.producer.picture ? (
                    <img 
                      src={property.producer.picture} 
                      alt={`Foto de ${property.producer.name}`}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full mr-4 bg-gray-200 flex items-center justify-center text-gray-500">
                      <FiUser size={30}/>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{property.producer.name}</p>
                    {property.branch?.display_name && property.branch.display_name !== property.producer.name && (
                       <p className="text-sm text-gray-500">{property.branch.display_name}</p>
                    )}
                  </div>
                </div>
                
                {property.producer.phone && (
                  <a 
                    href={`tel:${property.producer.phone.replace(/\s+/g, '')}`} 
                    className="flex items-center text-bordo hover:text-bordo-dark mb-3 p-3 bg-bordo/5 hover:bg-bordo/10 rounded-md transition-colors"
                  >
                    <FiPhone className="mr-3" size={18}/> Llamar ahora
                  </a>
                )}
                {property.producer.email && (
                  <a 
                    href={`mailto:${property.producer.email}`}
                    className="flex items-center text-bordo hover:text-bordo-dark p-3 bg-bordo/5 hover:bg-bordo/10 rounded-md transition-colors"
                  >
                    <FiMail className="mr-3" size={18}/> Enviar Email
                  </a>
                )}
                {/* Aquí podrías agregar un formulario de contacto simple si lo deseas */}
              </div>
            )}

            <Form propertyname={property.publication_title} />

             {/* Detalles Adicionales de la Sucursal (si es relevante y diferente) */}
            {property.branch && (
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm mt-4 text-xs text-gray-600">
                <h4 className="font-semibold mb-1">Información de la Inmobiliaria:</h4>
                <p>{property.branch.name}</p>
                {property.branch.address && <p>{property.branch.address}</p>}
                {property.branch.phone && property.branch.phone !== property.producer.phone && (
                    <p>Tel: {property.branch.phone_country_code} {property.branch.phone_area} {property.branch.phone}</p>
                )}
                 {property.branch.email && property.branch.email !== property.producer.email && (
                    <p>Email: {property.branch.email}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}