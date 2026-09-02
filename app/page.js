import Banner from "@/components/Banner/Banner";
import Formulario from "@/components/formulario/Formulario";
import Servicios from "@/components/Servicios/Servicios";
import Propiedades from "@/components/PropiedadesTokko/PropiedadesTokko";
import { TransitionPage } from "@/components/TransitionPage";
import { fetchTokkoProperties } from "@/lib/tokkoApi";
import GooeyButton from "@/components/GooeyButton/GooeyButton";
import AboutSection from "@/components/AboutSection/AboutSection";
import FAQ from "@/components/FAQ/FAQ";
export const metadata = {
  title: 'Inmobiliaria María Laura Bobadilla | Inicio',
  description: 'Inmobiliaria María Laura Bobadilla en Neuquén. Venta y alquiler de casas, departamentos, terrenos y locales comerciales.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar',
  }
};
export default async function Home() {
  const propiedadesRaw = await fetchTokkoProperties();
  const propiedadesMini = propiedadesRaw.map(p => ({
    operation: p.operations?.[0]?.operation_type || '',
    location: p.location?.name || '',
    type: p.type?.name || ''
  })).filter(p => p.location && p.type);
  return (
    <div>
      <TransitionPage />
      <main className="main">
        <Banner properties={propiedadesMini} />
        <div className="w-full mt-12 md:mt-20">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 uppercase mb-6 md:mb-8">
            Explorá <span className="text-main-100 font-serif italic">Oportunidades</span>
          </h2>
          <Propiedades properties={propiedadesRaw} limit={8} />
          <div className="flex justify-center mt-6 mb-12">
            <GooeyButton href="/propiedad" text="VER MÁS" />
          </div>
        </div>
        <div className="mx-auto mt-16">
          <Servicios />
        </div>
        <div className="md:px-8 mx-auto mt-12 mb-20">
          <AboutSection totalProperties={propiedadesRaw.length} />
        </div>
        <FAQ />
        <Formulario />
      </main>
    </div>
  );
}