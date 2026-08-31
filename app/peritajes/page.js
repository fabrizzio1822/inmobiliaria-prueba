import ServicePageLayout from "@/components/ServicePageLayout/ServicePageLayout";
import { servicesData } from "@/data/services";

export const metadata = {
  title: 'Peritajes Inmobiliarios | Inmobiliaria María Laura Bobadilla',
  description: 'Servicio de peritajes judiciales y extrajudiciales por expertos tasadores e inmobiliarios matriculados en Neuquén.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/peritajes',
  }
};

export default function Page() {
  return <ServicePageLayout serviceId="peritajes" />;
}
