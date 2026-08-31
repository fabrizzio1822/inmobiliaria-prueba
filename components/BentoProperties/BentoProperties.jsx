'use client';
import Link from 'next/link';

export default function BentoProperties() {
  const categories = [
    {
      id: 'casa',
      title: 'Casas',
      image: '/assets/bento/casa.jpg',
      link: '/propiedades?type=Casa',
      className: 'md:col-span-1 md:row-span-2 min-h-[400px] md:min-h-0'
    },
    {
      id: 'depto',
      title: 'Departamentos',
      image: '/assets/bento/depto.jpg',
      link: '/propiedades?type=Departamento',
      className: 'md:col-span-2 md:row-span-1 min-h-[250px] md:min-h-0'
    },
    {
      id: 'terreno',
      title: 'Terrenos',
      image: '/assets/bento/terreno.jpg',
      link: '/propiedades?type=Terreno',
      className: 'md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-0'
    },
    {
      id: 'duplex',
      title: 'Dúplex',
      image: '/assets/bento/duplex.jpg',
      link: '/propiedades?type=Duplex',
      className: 'md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-0'
    }
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            Encontrá tu propiedad ideal
          </h2>
        </div>
        <p className="text-gray-500 max-w-md text-base md:text-lg">
          Explorá nuestra exclusiva selección de casas, departamentos, terrenos y dúplex diseñados para tu estilo de vida.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px] lg:h-[700px]">
        {categories.map((cat) => (
          <Link 
            key={cat.id}
            href={cat.link}
            className={`group relative rounded-3xl overflow-hidden flex items-end shadow-light transition-transform duration-300 hover:-translate-y-1 ${cat.className}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${cat.image}')` }}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            
            <h3 className="relative z-10 text-white text-2xl lg:text-3xl font-medium p-6 md:p-8 w-full flex justify-between items-center">
              {cat.title}
              <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </span>
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
