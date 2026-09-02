'use client'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

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

const ServiceItem = ({ service, index }) => {
    const [isActive, setIsActive] = useState(false);
    const itemRef = useRef(null);

    useEffect(() => {
        let observer;

        const setupObserver = () => {
            if (window.innerWidth >= 768) {
                setIsActive(false);
                if (observer) observer.disconnect();
                return;
            }

            // On mobile, trigger when the item crosses the exact vertical center of the screen
            observer = new IntersectionObserver(
                ([entry]) => {
                    setIsActive(entry.isIntersecting);
                },
                {
                    root: null,
                    rootMargin: "-50% 0px -49% 0px", // 1% slice precisely at the center
                    threshold: 0
                }
            );

            if (itemRef.current) {
                observer.observe(itemRef.current);
            }
        };

        setupObserver();

        const handleResize = () => {
            setupObserver();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (observer) observer.disconnect();
        };
    }, []);

    const numberStr = (index + 1).toString().padStart(2, '0');

    // Dynamic classes: on mobile when active we simulate the hover effect, otherwise use the normal hover classes
    const baseContainerClass = "group flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12 border-b border-gray-200 transition-colors duration-500";
    const activeContainerClass = isActive ? "bg-main-100" : "hover:bg-main-100";

    const baseNumberClass = "text-6xl md:text-7xl font-light transition-colors duration-500 mb-4 md:mb-0 md:w-1/4";
    const activeNumberClass = isActive ? "text-white/80" : "text-gray-300 group-hover:text-white/80";

    const baseTitleClass = "text-2xl md:text-3xl font-semibold transition-colors duration-500 mb-3";
    const activeTitleClass = isActive ? "text-white" : "text-gray-900 group-hover:text-white";

    const baseDescClass = "transition-colors duration-500 text-base md:text-lg max-w-3xl";
    const activeDescClass = isActive ? "text-white/90" : "text-gray-500 group-hover:text-white/90";

    return (
        <Link
            ref={itemRef}
            href={service.link}
            className={`${baseContainerClass} ${activeContainerClass}`}
        >
            <div className={`${baseNumberClass} ${activeNumberClass}`}>
                {numberStr}
            </div>
            <div className="md:w-3/4 flex flex-col md:pl-8">
                <h3 className={`${baseTitleClass} ${activeTitleClass}`}>
                    {service.title}
                </h3>
                <p className={`${baseDescClass} ${activeDescClass}`}>
                    {service.description}
                </p>
            </div>
        </Link>
    );
};

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
                {services.map((service, index) => (
                    <ServiceItem key={index} service={service} index={index} />
                ))}
            </div>
        </div>
    )
}