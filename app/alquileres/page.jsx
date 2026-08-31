import { fetchTokkoProperties } from "@/lib/tokkoApi";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { TransitionPage } from "@/components/TransitionPage";
import PropertyFilters from "@/components/PropertyFilters/PropertyFilters";

export const metadata = {
  title: 'Alquileres de Propiedades | Inmobiliaria María Laura Bobadilla',
  description: 'Descubre las mejores opciones de alquiler en Neuquén. Departamentos, casas y locales comerciales disponibles.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/alquileres',
  }
};

export default async function Alquileres({ searchParams }) {
    let propiedades = await fetchTokkoProperties();

    // Filtro base de la página (Solo Alquiler)
    propiedades = propiedades.filter(p => p.operations?.[0]?.operation_type === 'Alquiler');

    // Aplicar filtros adicionales en memoria basados en los searchParams
    if (searchParams.location) {
        propiedades = propiedades.filter(p => p.location?.name === searchParams.location);
    }
    
    if (searchParams.type) {
        propiedades = propiedades.filter(p => p.type?.name === searchParams.type);
    }
    
    if (searchParams.rooms) {
        const minRooms = parseInt(searchParams.rooms);
        propiedades = propiedades.filter(p => p.suite_amount >= minRooms);
    }

    return (
        <div className="container mx-auto">
           <TransitionPage/>
            <h1 className="text-3xl font-bold text-center mt-8 mb-6">Alquileres</h1>
            
            {/* Componente de Filtros (fijando operación) */}
            <div className="max-w-6xl mx-auto px-4">
              <PropertyFilters operationFixed="Alquiler" />
            </div>

            {propiedades.length === 0 ? (
               <div className="text-center py-20 text-gray-500 text-xl">
                 No se encontraron propiedades en alquiler con esos filtros.
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-6 mb-10 py-4">
               {propiedades.map((property) => (
                  <PropertyCard key={property.id} property={property} />
               ))}
               </div>
            )}
        </div>
    );
}
