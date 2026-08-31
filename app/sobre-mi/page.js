import Image from "next/image";
import { TransitionPage } from "@/components/TransitionPage";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export const metadata = {
  title: 'Sobre Mí | Inmobiliaria María Laura Bobadilla',
  description: 'Conoce a María Laura Bobadilla, tu asesora inmobiliaria de confianza en Neuquén y zonas aledañas.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/sobre-mi',
  }
};

export default function SobreMi() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <TransitionPage />
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Imagen de Perfil */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <Image 
              src="/assets/perfil-placeholder.jpg" // Asegúrate de reemplazar esta imagen
              alt="María Laura Bobadilla"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Contenido de Texto */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Hola, soy <span className="text-main-100">María Laura Bobadilla</span>
          </h1>
          <h2 className="text-xl text-gray-600 font-medium border-b-2 border-main-100 pb-4 inline-block">
            Corredora Pública Inmobiliaria
          </h2>
          
          <div className="text-gray-700 text-lg space-y-4">
            <p>
              Con años de experiencia en el mercado inmobiliario de <strong>Neuquén Capital y alrededores</strong>, mi objetivo principal es acompañarte de manera segura y transparente en una de las decisiones más importantes de tu vida: encontrar tu hogar ideal o vender tu propiedad al mejor valor del mercado.
            </p>
            <p>
              Me especializo en brindar un trato personalizado, escuchando las necesidades reales de cada cliente y ofreciendo soluciones a medida, ya sea para vivienda permanente, alquiler comercial o evaluación de proyectos de inversión.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
            <div className="flex items-center gap-3 text-gray-700">
              <FiCheckCircle className="text-main-100" size={24} />
              <span className="font-semibold">Asesoramiento Integral</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FiCheckCircle className="text-main-100" size={24} />
              <span className="font-semibold">Tasaciones Precisas</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FiCheckCircle className="text-main-100" size={24} />
              <span className="font-semibold">Peritajes Judiciales</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FiCheckCircle className="text-main-100" size={24} />
              <span className="font-semibold">Trato Personalizado</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              href="/propiedad" 
              className="bg-main-100 hover:bg-main-200 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-center"
            >
              Ver Propiedades
            </Link>
            <Link 
              href="/contactame" 
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg shadow border border-gray-300 transition-colors text-center"
            >
              Contactarme
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
