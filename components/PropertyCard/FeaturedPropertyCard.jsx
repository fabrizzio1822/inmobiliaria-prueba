import Link from "next/link";
import Image from "next/image";

export default function FeaturedPropertyCard({ property }) {
  // 1. Resolver el área
  const area = parseFloat(property.roofed_surface) > 0 ? property.roofed_surface :
               parseFloat(property.total_surface) > 0 ? property.total_surface :
               property.surface;

  // 2. Operación y precio
  const operationType = property.operations?.[0]?.operation_type || '';
  const priceObj = property.operations?.[0]?.prices?.[0];
  
  const priceFormatted = priceObj?.price > 1
    ? `${priceObj.currency === 'USD' ? 'USD' : '$'} ${priceObj.price.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`
    : "Consultar";

  const imageAltText = property.publication_title || 
                       `${property.type?.name || 'Propiedad'} en ${property.location?.name || 'Neuquén'}`;

  // Características pequeñas (ej: 3 Beds | 2 Baths | Balcony)
  const features = [];
  if (property.suite_amount > 0) features.push(`${property.suite_amount} Dorm`);
  if (property.bathroom_amount > 0) features.push(`${property.bathroom_amount} Baños`);
  if (property.tags && property.tags.length > 0) {
    features.push(property.tags[0].name); // Agregar 1 amenity principal
  }
  const featuresString = features.join(" | ");

  return (
    <div className="relative w-full h-[450px] rounded-3xl overflow-hidden group">
      {/* Imagen de fondo */}
      <Image
        src={property.photos?.[0]?.image || "/placeholder.jpg"}
        alt={imageAltText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        className="transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Gradiente oscuro inferior intenso */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Badge de Operación (Venta / Alquiler) */}
      {operationType && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-main-100 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            {operationType === 'Venta' ? 'En Venta' : operationType === 'Alquiler' ? 'En Alquiler' : operationType}
          </span>
        </div>
      )}

      {/* Contenido (Alineado abajo) */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end text-white">
        
        {/* Título */}
        <h3 className="text-xl font-bold mb-2 line-clamp-1">
          {property.publication_title || "Propiedad"}
        </h3>
        
        {/* Fila: Área y Precio */}
        <div className="flex items-center gap-3 mb-2">
          {parseFloat(area) > 0 && (
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
              {area} m²
            </span>
          )}
          <span className="font-bold text-lg">
            {priceFormatted}
          </span>
        </div>

        {/* Fila: Características */}
        {featuresString && (
          <p className="text-sm text-gray-300 mb-5 line-clamp-1 font-medium">
            {featuresString}
          </p>
        )}

        {/* Botón */}
        <Link 
          href={`/propiedades/${property.id}`}
          className="w-full py-2.5 rounded-full border border-white/40 text-center text-sm font-semibold hover:bg-white hover:text-black transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
