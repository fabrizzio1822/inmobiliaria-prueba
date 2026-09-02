import { fetchTokkoProperties } from "@/lib/tokkoApi";
import { TransitionPage } from "@/components/TransitionPage";
import PropertyFilters from "@/components/PropertyFilters/PropertyFilters";
import PropertiesViewToggle from "@/components/PropertiesViewToggle/PropertiesViewToggle";

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
        const op = searchParams.operation.toLowerCase();
        propiedades = propiedades.filter(p => p.operations?.[0]?.operation_type?.toLowerCase() === op);
    }

    if (searchParams.location) {
        const loc = searchParams.location.toLowerCase();
        propiedades = propiedades.filter(p => p.location?.name?.toLowerCase() === loc);
    }
    
    if (searchParams.type) {
        const typeParam = searchParams.type.toLowerCase();
        propiedades = propiedades.filter(p => {
            const pType = p.type?.name?.toLowerCase() || '';
            if (typeParam === 'terreno' || typeParam === 'lote') {
                return pType.includes('terreno') || pType.includes('lote');
            }
            return pType.includes(typeParam);
        });
    }
    
    if (searchParams.rooms) {
        const minRooms = parseInt(searchParams.rooms);
        propiedades = propiedades.filter(p => p.suite_amount >= minRooms);
    }

    return (
        <div className="container mx-auto">
           <TransitionPage/>
            <h1 className="text-3xl font-bold text-center mt-8 mb-6">Propiedades</h1>
            
            {/* Componente de Filtros */}
            <div className="max-w-6xl mx-auto px-4 mb-6">
              <PropertyFilters />
            </div>

            <PropertiesViewToggle properties={propiedades} />
        </div>
    )
}
