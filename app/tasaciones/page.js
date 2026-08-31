import ServicePageLayout from "@/components/ServicePageLayout/ServicePageLayout";
import { servicesData } from "@/data/services";

export const metadata = {
  title: 'Tasaciones de Propiedades | Inmobiliaria María Laura Bobadilla',
  description: 'Solicita la tasación profesional de tu propiedad en Neuquén. Obtén el valor real de mercado con nuestros expertos.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/tasaciones',
  }
};

export default function Page() {
  return <ServicePageLayout serviceId="tasaciones" />;
}
