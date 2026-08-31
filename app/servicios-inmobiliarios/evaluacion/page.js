import ServicePageLayout from "@/components/ServicePageLayout/ServicePageLayout";
import { servicesData } from "@/data/services";

export const metadata = {
  title: 'Evaluación de Proyectos | Inmobiliaria María Laura Bobadilla',
  description: 'Análisis y evaluación integral de proyectos inmobiliarios para maximizar tu rentabilidad y tomar decisiones seguras.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/servicios-inmobiliarios/evaluacion',
  }
};

export default function Page() {
  return <ServicePageLayout serviceId="evaluacion" />;
}
