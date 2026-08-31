import { fetchTokkoProperties } from "@/lib/tokkoApi";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { TransitionPage } from "@/components/TransitionPage";
import PropertyFilters from "@/components/PropertyFilters/PropertyFilters";

export const metadata = {
  title: 'Propiedades en Venta y Alquiler | Inmobiliaria María Laura Bobadilla',
  description: 'Explora nuestro catálogo de propiedades disponibles para compra o alquiler en Neuquén y zonas aledañas.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/propiedad',
  }
};

export default async function PropiedadesTokko ({ searchParams }) {

    let propiedades = await fetchTokkoProperties();

    // Aplicar filtros en memoria basados en los searchParams de la URL
    if (searchParams.operation) {
        propiedades = propiedades.filter(p => p.operations?.[0]?.operation_type === searchParams.operation);
    }

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
        <div className=" container mx-auto" >
           <TransitionPage/>
            <h1 className="text-3xl font-bold text-center mt-8 mb-6">Propiedades</h1>
            
            {/* Componente de Filtros */}
            <div className="max-w-6xl mx-auto px-4">
              <PropertyFilters />
            </div>

            {propiedades.length === 0 ? (
               <div className="text-center py-20 text-gray-500 text-xl">
                 No se encontraron propiedades con esos filtros.
               </div>
            ) : (
               <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-6 mb-10 py-4">
               {propiedades.map((property) => (
                  <PropertyCard key={property.id} property={property} />
               ))}
            </div>
            )}

        </div>
    )
}
