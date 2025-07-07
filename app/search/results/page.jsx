import Link from "next/link";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import { Location } from 'akar-icons'; // Asegúrate que este ícono esté disponible o reemplázalo
import SearchForm from "@/components/SearchForm/SearchForm"; // Para mostrar el formulario también en esta página
import { FaCamera } from 'react-icons/fa'; 

// Función para obtener los datos de búsqueda
async function getSearchedProperties(query) {
  // Asegúrate de que la URL de la API sea la correcta para tu entorno
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.marialaurabobadilla.com.ar/';
  
  let fetchUrl = `${apiUrl}/api/properties/search`;
  if (query) {
    fetchUrl += `?query=${encodeURIComponent(query)}`;
  }

  const res = await fetch(fetchUrl, {
    cache: 'no-store', // Para asegurar datos frescos en cada búsqueda
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error fetching search results:", errorData);
    throw new Error(errorData.message || `Error al obtener resultados de búsqueda: ${res.status}`);
  }
  return res.json();
}

export default async function SearchResultsPage({ searchParams }) {
  const query = searchParams.query || ""; // Obtener el query de la URL, o string vacío si no existe
  let properties = [];
  let error = null;

  try {
    properties = await getSearchedProperties(query);
  } catch (e) {
    console.error(e);
    error = e.message;
  }

  return (
    <div className="container mx-auto px-6 my-5 py-4 ">
      {/* Puedes incluir el formulario de búsqueda aquí también para nuevas búsquedas */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Realizar una nueva búsqueda</h2>
        <SearchForm />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        {query ? `Resultados de búsqueda para: "${query}"` : "Todas las propiedades"}
      </h1>

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 bg-red-100 p-4 rounded-lg">Error al cargar propiedades: {error}</p>
        </div>
      )}

      {!error && properties.length > 0 ? (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
           <div key={property.id} className="border rounded-lg shadow-lg overflow-hidden flex flex-col bg-white min-h-[500px]">
          <Link href={`/propiedades/${property.id}`} className="flex flex-col h-full group">
            <div className="relative h-60 overflow-hidden">
              <img
                src={property.photos?.[0]?.image || "/placeholder.jpg"}
                alt={property.publication_title || "Imagen de la propiedad"}
                className="w-full h-full object-cover rounded-t-lg transform group-hover:scale-105 transition-transform duration-300"
              />
              {/* Etiqueta de Operación (Venta/Alquiler) */}
              {property.operations?.[0]?.operation_type && (
                <span className="absolute top-2 left-2 bg-main-100 text-white px-3 py-1 text-xs font-semibold rounded shadow">
                  {property.operations[0].operation_type}
                </span>
              )}
              {/* Icono de la cámara y contador de fotos */}
              {property.photos && property.photos.length > 0 && (
                <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-70 text-white rounded-md p-1 flex items-center text-xs">
                  <FaCamera className="mr-1" size={14} />
                  <span>{property.photos.length}</span>
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center gap-1 mb-2">
                <Location strokeWidth={2} size={18} className="text-bordo flex-shrink-0" />
                <h2 className="text-sm text-gray-600 truncate" title={property.address}>
                  {property.address || "Dirección no disponible"}
                </h2>
              </div>
              <h3 className="text-md font-semibold text-gray-800 mb-1 min-h-[40px] group-hover:text-bordo transition-colors duration-150">
                {property.publication_title || "Título no disponible"}
              </h3>

              {/* Precio */}
              <p className="text-bordo font-bold text-lg mb-2">
                {property.operations?.[0]?.prices?.[0]?.price
                  ? `${property.operations[0].prices[0].price.toLocaleString('es-AR', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0, // Sin decimales para precios grandes
                    })} ${property.operations[0].prices[0].currency}`
                  : "Consultar precio"}
              </p>

              <p className="text-gray-500 text-xs mb-3 capitalize">
                {property.type?.name || "Tipo no especificado"}
                {property.location?.name && ` en ${property.location.name}`}
              </p>

              {/* Características */}
              <div className="mt-auto pt-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-700">
                  {property.suite_amount > 0 && (
                    <div className="flex items-center">
                      <LiaBedSolid className="mr-1 text-bordo" size={16}/>
                      <span>{property.suite_amount} Dorm.</span>
                    </div>
                  )}
                  {property.bathroom_amount > 0 && (
                    <div className="flex items-center">
                      <LiaBathSolid className="mr-1 text-bordo" size={16}/>
                      <span>{property.bathroom_amount} Baño(s)</span>
                    </div>
                  )}
                  {(parseFloat(property.surface) > 0 || parseFloat(property.total_surface) > 0 || parseFloat(property.roofed_surface) > 0) && (
                    <div className="flex items-center">
                      <LiaRulerCombinedSolid className="mr-1 text-bordo" size={16}/>
                      <span>
                        {/* Mostrar superficie cubierta si existe, sino la total o la 'surface' */}
                        {parseFloat(property.roofed_surface) > 0 ? property.roofed_surface :
                          parseFloat(property.total_surface) > 0 ? property.total_surface :
                          property.surface} m²
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
          ))}
        </div>
      ) : (
        !error && (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">
              {query ? `No se encontraron propiedades para "${query}".` : "No hay propiedades para mostrar."}
            </p>
            <p className="text-sm text-gray-500 mt-2">Intenta con otros términos de búsqueda o revisa todas nuestras propiedades.</p>
          </div>
        )
      )}
    </div>
  );
}