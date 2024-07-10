'use client'
import { SessionProvider } from "next-auth/react";
import { TransitionPage } from "@/components/TransitionPage";
import Image from 'next/image'
import Footer from "@/components/Footer/Footer";

export default function EvaluacionProyecto() {
    return (
        <SessionProvider>
            <TransitionPage />
            <div className="font-sans antialiased text-gray-900">
                <section className="sm:py-12">
                    <div className=" mx-auto px-6 ">
                        <div className="servicios-contenedor">
                            <div className="servicios-contenedor-texto ">
                                <h2 className="titulo-servicio text-4xl py-4 font-bold color-gris">EVALUACIÓN DE PROYECTOS</h2>
                                <hr className="my-4" />
                                <p className="py-4 color-gris">La evaluación tiene como fin asegurar decisiones fundamentadas y éxito sostenible. Se realiza un trabajo de análisis sistemático y objetivo de diversos aspectos de una iniciativa, desde su concepción hasta su implementación y seguimiento. Este proceso busca identificar oportunidades, evaluar riesgos, medir impactos y proporcionar información crítica para la toma de decisiones.</p>
                            </div>
                            <Image
                                src='/assets/evaluacion-proyectos.jpg'
                                width={1100}
                                height={900}
                                alt="Evaluación de Proyectos"
                            />
                        </div>
                        <div className="container m-auto py-5 mt-12">
                            <div className="mb-8">
                                <h3 className="text-3xl font-semibold color-bordo">Servicios Ofrecidos</h3>
                                <ul className="list-disc list-inside mt-4 text-gray-700">
                                    <li className="md:text-xl">Análisis de viabilidad técnica, económica y financiera</li>
                                    <li className="md:text-xl">Evaluación de costos y beneficios</li>
                                    <li className="md:text-xl">Gestión y mitigación de riesgos</li>
                                    <li className="md:text-xl">Monitoreo y control del progreso del proyecto</li>
                                    <li className="md:text-xl">Evaluación del impacto y resultados del proyecto</li>
                                </ul>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-3xl font-semibold color-bordo">Metodología</h3>
                                <p className="mt-4 md:text-xl text-gray-700">Utilizamos metodologías y herramientas reconocidas internacionalmente, para asegurar una evaluación precisa y efectiva de tus proyectos. Nuestro enfoque incluye:</p>
                                <ul className="list-disc list-inside mt-4 text-gray-700">
                                    <li className="md:text-xl">Análisis detallado y basado en datos</li>
                                    <li className="md:text-xl">Revisión constante y ajuste de estrategias</li>
                                    <li className="md:text-xl">Colaboración estrecha con todas las partes interesadas</li>
                                </ul>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-3xl font-semibold color-bordo">Beneficios</h3>
                                <p className="mt-4 md:text-xl text-gray-700">Al trabajar con nosotros, puedes esperar:</p>
                                <ul className="list-disc list-inside mt-4 text-gray-700">
                                    <li className="md:text-xl">Optimización de recursos y reducción de costos</li>
                                    <li className="md:text-xl">Mayor certeza en la toma de decisiones</li>
                                    <li className="md:text-xl">Mitigación efectiva de riesgos</li>
                                    <li className="md:text-xl">Resultados medibles y alineados con los objetivos del negocio</li>
                                </ul>
                            </div>
                            </div>
                    </div>
                </section>
                <Footer/>
            </div>
        </SessionProvider>
    );
}

