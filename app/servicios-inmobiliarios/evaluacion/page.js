'use client'
import { TransitionPage } from "@/components/TransitionPage";
import Image from 'next/image'

export default function EvaluacionProyecto() {
    return (
        <div>
            <TransitionPage />
            <div className="font-sans antialiased text-gray-900">
                <section className="sm:py-12">
                    <div className=" container mx-auto px-6 ">
                        <div className="flex px-4 flex-col lg:flex-row sm:py-12 gap-8 md:gap-12 lg:gap-20">
                            {/* Text Content */}
                            <div className="flex flex-col justify-center flex-1">
                                <h2 className="sm:text-4xl text-2xl py-4 font-bold text-zinc-700">EVALUACIÓN DE PROYECTOS</h2>
                                <hr className="bg-main-100 max-w-sm h-[5px] my-2" />
                                <p className="py-4 text-gray-700 md:text-lg">
                                La evaluación tiene como fin asegurar decisiones fundamentadas y éxito sostenible. Se realiza un
                                trabajo de análisis sistemático y objetivo de diversos aspectos de una iniciativa, desde su
                                concepción hasta su implementación y seguimiento. Este proceso busca identificar oportunidades,
                                evaluar riesgos, medir impactos y proporcionar información crítica para la toma de decisiones.
                                </p>
                            </div>

                            {/* Image */}
                            <Image
                                className="rounded-xl w-full lg:max-w-md lg:max-w-lg object-cover"
                                src="/assets/evaluacion-proyectos.jpg"
                                width={700}
                                height={500}
                                alt="Evaluación de Proyectos"
                                objectFit="cover"
                            />
                            </div>
                        <div className="container m-auto py-5 mt-12">
                            <div className="mb-8">
                                <h3 className="text-3xl font-semibold text-main-100">Servicios Ofrecidos</h3>
                                <ul className="list-disc list-inside mt-4 text-gray-700">
                                    <li className="md:text-xl">Análisis de viabilidad técnica, económica y financiera</li>
                                    <li className="md:text-xl">Evaluación de costos y beneficios</li>
                                    <li className="md:text-xl">Gestión y mitigación de riesgos</li>
                                    <li className="md:text-xl">Monitoreo y control del progreso del proyecto</li>
                                    <li className="md:text-xl">Evaluación del impacto y resultados del proyecto</li>
                                </ul>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-3xl font-semibold text-main-100">Metodología</h3>
                                <p className="mt-4 md:text-xl text-gray-700">Utilizamos metodologías y herramientas reconocidas internacionalmente, para asegurar una evaluación precisa y efectiva de tus proyectos. Nuestro enfoque incluye:</p>
                                <ul className="list-disc list-inside mt-4 text-gray-700">
                                    <li className="md:text-xl">Análisis detallado y basado en datos</li>
                                    <li className="md:text-xl">Revisión constante y ajuste de estrategias</li>
                                    <li className="md:text-xl">Colaboración estrecha con todas las partes interesadas</li>
                                </ul>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-3xl font-semibold text-main-100">Beneficios</h3>
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
            </div>
        </div>
    );
}

