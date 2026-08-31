'use client'
import Link from 'next/link';

const services = [
    {
        title: "Asesoramiento en compra y venta",
        description: "Asesoramiento experto para ayudarte a tomar las mejores decisiones en tus operaciones inmobiliarias.",
        link: "/servicios-inmobiliarios/asesoramiento",
    },
    {
        title: "Evaluación de proyectos",
        description: "Evaluaciones detalladas para asegurar la viabilidad y rentabilidad de tus proyectos inmobiliarios.",
        link: "/servicios-inmobiliarios/evaluacion",
    },
    {
        title: "Tasaciones",
        description: "Servicios de tasación precisos para determinar el valor real y actual de las propiedades.",
        link: "/tasaciones",
    },
    {
        title: "Peritajes",
        description: "Servicios de peritaje para resolver disputas y brindar claridad sobre el estado de los inmuebles.",
        link: "/peritajes",
    }
];

export default function Servicios() {
    return (
        <div className="w-full py-16 md:py-24 bg-white">
            <div className="mx-auto text-left px-4 mb-12 md:mb-20">
                <h2 className="text-3xl md:text-5xl lg:text-6xl text-gray-900">
                    MIS <span className="text-main-100 italic font-medium">SERVICIOS</span>
                </h2>
                <p className="text-lg md:text-2xl text-gray-500 mt-4 max-w-3xl">
                    Asesoramiento inmobiliario integral para ayudarte a tomar decisiones seguras, claras y acordes a tus objetivos.
                </p>
            </div>

            <div className="w-full flex flex-col border-t border-gray-200">
                {services.map((service, index) => {
                    const numberStr = (index + 1).toString().padStart(2, '0');
                    return (
                        <Link
                            key={index}
                            href={service.link}
                            className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12 border-b border-gray-200 transition-colors duration-300 hover:bg-main-100"
                        >
                            <div className="text-6xl md:text-7xl font-light text-gray-300 group-hover:text-white/80 transition-colors duration-300 mb-4 md:mb-0 md:w-1/4">
                                {numberStr}
                            </div>
                            <div className="md:w-3/4 flex flex-col md:pl-8">
                                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-300 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 group-hover:text-white/90 transition-colors duration-300 text-base md:text-lg max-w-3xl">
                                    {service.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}