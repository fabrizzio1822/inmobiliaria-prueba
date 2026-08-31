import Link from "next/link";
import Image from "next/image";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import { Location } from 'akar-icons';
import { FaArrowRight } from 'react-icons/fa';

export default function PropertyCard({ property }) {
  // 1. Resolver el área (usando el criterio: cubierta -> construida -> terreno)
  const area = parseFloat(property.roofed_surface) > 0 ? property.roofed_surface :
               parseFloat(property.total_surface) > 0 ? property.total_surface :
               property.surface;

  // 2. Operación y precio
  const operationType = property.operations?.[0]?.operation_type || '';
  const priceObj = property.operations?.[0]?.prices?.[0];
  
  // Formatear precio detectando ARS vs USD
  const priceFormatted = priceObj?.price
    ? `${priceObj.currency === 'USD' ? 'USD' : '$'} ${priceObj.price.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`
    : "Consultar precio";

  // Generar un texto alternativo (alt) descriptivo
  const imageAltText = property.publication_title || 
                       `${property.type?.name || 'Propiedad'} en ${operationType} - ${property.location?.name || 'Neuquén'}`;

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[460px]">
      
      {/* HEADER: Imagen y Badge */}
      <Link href={`/propiedades/${property.id}`} className="relative h-64 overflow-hidden block">
        <Image
          src={property.photos?.[0]?.image || "/placeholder.jpg"}
          alt={imageAltText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 hover:scale-105"
        />
        {/* Etiqueta / Badge */}
        {operationType && (
          <span className="absolute top-4 left-4 bg-white text-gray-900 px-3 py-1 text-xs font-bold uppercase rounded shadow-sm tracking-wider">
            En {operationType}
          </span>
        )}
      </Link>

      {/* BODY */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Ubicación */}
        <div className="flex items-center gap-1.5 mb-2">
          <Location strokeWidth={2} size={16} className="text-gray-400 flex-shrink-0" />
          <p className="text-xs text-gray-500 font-medium truncate" title={property.address || property.location?.name}>
            {property.address || property.location?.name || "Ubicación no disponible"}
          </p>
        </div>
        
        {/* Título */}
        <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-tight min-h-[2.5rem]">
          {property.publication_title || "Propiedad sin título"}
        </h3>

        {/* CARACTERÍSTICAS (FEATURES ROW) */}
        <div className="flex items-center gap-3 mt-auto text-sm text-gray-600 font-medium mb-5">
          {property.suite_amount > 0 && (
            <div className="flex items-center gap-1.5" aria-label={`${property.suite_amount} dormitorios`}>
              <LiaBedSolid size={20} className="text-gray-400" />
              <span>{property.suite_amount} Dorm</span>
            </div>
          )}
          
          {property.suite_amount > 0 && property.bathroom_amount > 0 && (
            <span className="text-gray-300">|</span>
          )}

          {property.bathroom_amount > 0 && (
            <div className="flex items-center gap-1.5" aria-label={`${property.bathroom_amount} baños`}>
              <LiaBathSolid size={20} className="text-gray-400" />
              <span>{property.bathroom_amount} Baños</span>
            </div>
          )}

          {(property.suite_amount > 0 || property.bathroom_amount > 0) && parseFloat(area) > 0 && (
            <span className="text-gray-300">|</span>
          )}

          {parseFloat(area) > 0 && (
            <div className="flex items-center gap-1.5" aria-label={`${area} metros cuadrados`}>
              <LiaRulerCombinedSolid size={20} className="text-gray-400" />
              <span>{area} M²</span>
            </div>
          )}
        </div>

        {/* FOOTER: Precio y Botón */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xl font-extrabold text-gray-900 truncate pr-2">
            {priceFormatted}
          </p>
          <Link 
            href={`/propiedades/${property.id}`}
            className="flex-shrink-0 flex items-center justify-center bg-main-100 hover:bg-main-200 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors gap-2"
            aria-label="Ver detalles de la propiedad"
          >
            Ver más
            <FaArrowRight size={12} />
          </Link>
        </div>

      </div>
    </div>
  );
}
