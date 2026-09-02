import { fetchTokkoProperties } from "@/lib/tokkoApi";
import { TransitionPage } from "@/components/TransitionPage";
import PropertyFilters from "@/components/PropertyFilters/PropertyFilters";
import PropertiesViewToggle from "@/components/PropertiesViewToggle/PropertiesViewToggle";

export const metadata = {
  title: 'Propiedades en Venta | Inmobiliaria María Laura Bobadilla',
  description: 'Descubre las mejores opciones de propiedades en venta en Neuquén. Departamentos, casas y terrenos disponibles.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/ventas',
  }
};

export default async function Ventas({ searchParams }) {
    let propiedades = await fetchTokkoProperties();

    // Filtro base de la página (Solo Venta)
    propiedades = propiedades.filter(p => p.operations?.[0]?.operation_type === 'Venta');

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
            <h1 className="text-3xl font-bold text-center mt-8 mb-6">Propiedades en Venta</h1>
            
            {/* Componente de Filtros (fijando operación) */}
            <div className="max-w-6xl mx-auto px-4 mb-6">
              <PropertyFilters operationFixed="Venta" />
            </div>

            <PropertiesViewToggle properties={propiedades} />
        </div>
    );
}
