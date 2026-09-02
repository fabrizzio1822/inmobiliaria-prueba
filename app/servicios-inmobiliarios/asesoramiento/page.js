import { fetchTokkoProperties } from "@/lib/tokkoApi";
import ServicePageLayout from "@/components/ServicePageLayout/ServicePageLayout";
import PropertyCard from "@/components/PropertyCard/PropertyCard";

export const metadata = {
  title: 'Asesoramiento Inmobiliario | Inmobiliaria María Laura Bobadilla',
  description: 'Te asesoramos en la compra, venta y alquiler de propiedades para garantizar transacciones seguras y exitosas.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/servicios-inmobiliarios/asesoramiento',
  }
};

export default async function Asesoramiento() {
  const propiedades = await fetchTokkoProperties();

  return (
    <ServicePageLayout serviceId="asesoramiento">
      <h2 className="text-3xl px-4 text-bold font-bold text-main-100 py-3 container mx-auto">Propiedades</h2>
      <hr className="mb-4 container mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-6 my-5 py-4">
        {propiedades.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </ServicePageLayout>
  )
}
