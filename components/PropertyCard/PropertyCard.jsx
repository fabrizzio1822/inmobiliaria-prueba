import Link from "next/link";
import Image from "next/image";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import { Location } from 'akar-icons';
import { FaArrowRight, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function PropertyCard({ property, layout = 'grid' }) {
  // 1. Resolver el área (usando el criterio: cubierta -> construida -> terreno)
  const area = parseFloat(property.roofed_surface) > 0 ? property.roofed_surface :
               parseFloat(property.total_surface) > 0 ? property.total_surface :
               property.surface;

  // 2. Operación y precio
  const operationType = property.operations?.[0]?.operation_type || '';
  const priceObj = property.operations?.[0]?.prices?.[0];
  
  // Formatear precio (ocultar si es 1 o menor)
  const priceFormatted = priceObj?.price > 1
    ? `${priceObj.currency === 'USD' ? 'USD' : '$'} ${priceObj.price.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`
    : "Consultar precio";

  // Expensas
  const expensesFormatted = property.expenses > 0 
    ? `$ ${property.expenses.toLocaleString('es-AR')} Expensas` 
    : null;

  // Generar un texto alternativo (alt) descriptivo
  const imageAltText = property.publication_title || 
                       `${property.type?.name || 'Propiedad'} en ${operationType} - ${property.location?.name || 'Neuquén'}`;

  const isRow = layout === 'row';
  const isMap = layout === 'map';
  const isGrid = !isRow && !isMap;

  // ===================== VISTA MAP =====================
  // Retorno temprano para la vista del mapa para imitar exactamente la imagen provista
  if (isMap) {
    return (
      <Link href={`/propiedades/${property.id}`} className="block bg-white rounded-[20px] shadow-lg p-2 w-[260px] group transition-all hover:shadow-xl font-sans">
        {/* Imagen con padding interno */}
        <div className="relative h-36 w-full rounded-[14px] overflow-hidden mb-3">
          <Image
            src={property.photos?.[0]?.image || "/placeholder.jpg"}
            alt={imageAltText}
            fill
            sizes="250px"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          {operationType && (
            <span className="absolute top-2 right-2 bg-white text-gray-900 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md shadow-sm z-10">
              {operationType}
            </span>
          )}
        </div>

        <div className="px-1 pb-1 flex flex-col">
          {/* Título */}
          <h3 className="text-[14px] font-bold text-gray-900 line-clamp-1 mb-1">
            {property.publication_title || property.address || "Propiedad"}
          </h3>

          {/* Ubicación */}
          <div className="flex items-center gap-1 mb-3">
            <Location strokeWidth={2} size={12} className="text-gray-400 flex-shrink-0" />
            <p className="text-[11px] text-gray-500 font-medium truncate">
              {property.address || property.location?.name || "Ubicación"}
            </p>
          </div>
          
          {/* CARACTERÍSTICAS */}
          <div className="flex items-center gap-1.5 mb-4 text-gray-400 font-medium text-[10px]">
            {parseFloat(area) > 0 && (
              <div className="flex items-center gap-1">
                <LiaRulerCombinedSolid size={12} />
                <span>{area} M²</span>
              </div>
            )}
            {parseFloat(area) > 0 && property.suite_amount > 0 && <span className="text-gray-200">|</span>}
            {property.suite_amount > 0 && (
              <div className="flex items-center gap-1">
                <LiaBedSolid size={12} />
                <span>{property.suite_amount} Dorm</span>
              </div>
            )}
            {property.suite_amount > 0 && property.bathroom_amount > 0 && <span className="text-gray-200">|</span>}
            {property.bathroom_amount > 0 && (
              <div className="flex items-center gap-1">
                <LiaBathSolid size={12} />
                <span>{property.bathroom_amount} Baño</span>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-extrabold text-gray-900 truncate">
              {priceFormatted}
            </p>
            <div className="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-[10px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
              Ver más
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Handlers para los botones (Row layout)
  const handleWhatsApp = (e) => {
    e.preventDefault();
    const message = `Hola, quiero consultar por la propiedad "${property.publication_title || property.address}" (Ref: ${property.reference_code || property.id}).`;
    window.open(`https://wa.me/5492990000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleContact = (e) => {
    e.preventDefault();
    window.location.href = `/propiedades/${property.id}#contacto`;
  };

  // String de características para la vista row
  const rowFeatures = [
    parseFloat(area) > 0 ? `${area} m² tot.` : null,
    property.room_amount > 0 ? `${property.room_amount} amb.` : null,
    property.suite_amount > 0 ? `${property.suite_amount} dorm.` : null,
    property.bathroom_amount > 0 ? `${property.bathroom_amount} baño${property.bathroom_amount > 1 ? 's' : ''}` : null,
  ].filter(Boolean).join('  ');

  // Base classes for the card wrapper
  let cardClasses = "bg-white shadow-sm border border-gray-200 overflow-hidden flex transition-all duration-300 hover:shadow-lg group cursor-pointer h-full ";
  
  if (isRow) {
    cardClasses += "flex-col md:flex-row rounded-[12px] min-h-[260px]";
  } else {
    cardClasses += "flex-col rounded-[16px] min-h-[460px]";
  }

  // Base classes for the image container
  let imgContainerClasses = "relative overflow-hidden shrink-0 ";
  if (isRow) {
    imgContainerClasses += "h-64 md:h-auto md:w-[35%] lg:w-[30%] border-r border-gray-100";
  } else {
    imgContainerClasses += "h-64 block";
  }

  // Base classes for the body
  let bodyClasses = "flex flex-col flex-grow ";
  if (isRow) {
    bodyClasses += "p-5 md:p-6 w-full";
  } else {
    bodyClasses += "p-5";
  }

  // Descripción truncada
  const descriptionText = property.description ? property.description.replace(/<[^>]+>/g, '') : "Descripción no disponible.";

  return (
    <Link href={`/propiedades/${property.id}`} className={cardClasses}>
      
      {/* HEADER: Imagen y Badge */}
      <div className={imgContainerClasses}>
        <Image
          src={property.photos?.[0]?.image || "/placeholder.jpg"}
          alt={imageAltText}
          fill
          sizes={isRow ? "(max-width: 768px) 100vw, 35vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {/* Etiqueta / Badge */}
        {operationType && (
          <span className={`absolute top-4 left-4 bg-white text-gray-900 px-3 py-1 text-xs font-bold uppercase rounded shadow-sm tracking-wider z-10 ${isRow ? 'hidden md:block' : ''}`}>
            En {operationType}
          </span>
        )}
      </div>

      {/* BODY */}
      <div className={bodyClasses}>
        
        {/* ===================== VISTA ROW ===================== */}
        {isRow && (
          <div className="flex flex-col h-full justify-between">
            {/* Top Area */}
            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-[22px] font-extrabold text-gray-900 leading-none">
                    {priceFormatted}
                  </h3>
                  {expensesFormatted && (
                    <p className="text-gray-500 text-sm mt-1">{expensesFormatted}</p>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-700 mt-3 font-medium">
                {rowFeatures}
              </div>

              <h4 className="text-lg font-bold text-gray-900 mt-4 line-clamp-1">
                {property.address || property.publication_title || "Propiedad sin título"}
              </h4>
              <p className="text-sm text-gray-500">
                {property.location?.name || "Neuquén"}
              </p>

              <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                <span className="font-semibold">{property.type?.name || 'Propiedad'} en {operationType} - </span>
                {descriptionText}
              </p>
            </div>

            {/* Bottom Area (Buttons) */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button 
                onClick={handleWhatsApp}
                className="bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-semibold transition-colors shadow-sm"
              >
                WhatsApp
                <FaWhatsapp size={16} />
              </button>
              <button 
                onClick={handleContact}
                className="bg-main-100 hover:bg-main-200 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-semibold transition-colors shadow-sm"
              >
                Contactar
                <FaEnvelope size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ===================== VISTA GRID ===================== */}
        {isGrid && (
          <>
            {/* Ubicación */}
            <div className="flex items-center gap-1.5 mb-2">
              <Location strokeWidth={2} size={16} className="text-gray-400 flex-shrink-0" />
              <p className="text-xs text-gray-500 font-medium truncate" title={property.address || property.location?.name}>
                {property.address || property.location?.name || "Ubicación no disponible"}
              </p>
            </div>
            
            {/* Título */}
            <h3 className="text-lg mb-2 min-h-[2.5rem] font-bold text-gray-900 line-clamp-2 leading-tight">
              {property.publication_title || "Propiedad sin título"}
            </h3>

            {/* Descripción */}
            <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow">
              {descriptionText}
            </p>

            {/* CARACTERÍSTICAS (FEATURES ROW) */}
            <div className="flex items-center mt-auto text-gray-600 font-medium text-sm gap-3 mb-5">
              {property.suite_amount > 0 && (
                <div className="flex items-center gap-1" aria-label={`${property.suite_amount} dormitorios`}>
                  <LiaBedSolid size={20} className="text-gray-400" />
                  <span>{property.suite_amount} Dorm</span>
                </div>
              )}
              
              {property.suite_amount > 0 && property.bathroom_amount > 0 && (
                <span className="text-gray-300">|</span>
              )}

              {property.bathroom_amount > 0 && (
                <div className="flex items-center gap-1" aria-label={`${property.bathroom_amount} baños`}>
                  <LiaBathSolid size={20} className="text-gray-400" />
                  <span>{property.bathroom_amount} Baños</span>
                </div>
              )}

              {(property.suite_amount > 0 || property.bathroom_amount > 0) && parseFloat(area) > 0 && (
                <span className="text-gray-300">|</span>
              )}

              {parseFloat(area) > 0 && (
                <div className="flex items-center gap-1" aria-label={`${area} metros cuadrados`}>
                  <LiaRulerCombinedSolid size={20} className="text-gray-400" />
                  <span>{area} M²</span>
                </div>
              )}
            </div>

            {/* FOOTER: Precio y Botón */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
              <p className="text-xl font-extrabold text-gray-900 truncate pr-2">
                {priceFormatted}
              </p>
              <div 
                className="flex-shrink-0 flex items-center justify-center bg-main-100 group-hover:bg-main-200 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors gap-2"
                aria-label="Ver detalles de la propiedad"
              >
                Ver más
                <FaArrowRight size={12} />
              </div>
            </div>
          </>
        )}

      </div>
    </Link>
  );
}
