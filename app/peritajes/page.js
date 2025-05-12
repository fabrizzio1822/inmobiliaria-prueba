'use client'
import { TransitionPage } from "@/components/TransitionPage";
import Image from 'next/image'


export default function Peritajes() {
    return (
        <div>
            <TransitionPage />
            <div className="font-sans antialiased text-gray-900">
                <section className="sm:py-12">
                    <div className="mx-auto  container px-6">
                                            
                        <div className="flex flex-col lg:flex-row sm:py-12 gap-8 md:gap-12 lg:gap-20">
                        {/* Text Content */}
                        <div className="flex flex-col justify-center flex-1">
                            <h1 className="sm:text-4xl text-2xl py-4 font-bold text-zinc-700">PERITAJES</h1>
                            <hr className="bg-main-100 max-w-sm h-[5px] my-2" />
                            <p className="py-4 text-gray-700 text-start md:text-lg">
                            En el ámbito profesional, el peritaje emerge como una disciplina crucial para garantizar la
                            objetividad, precisión y confianza en la evaluación de diversos servicios. Contribuye a aclarar
                            hechos complejos y a facilitar la comprensión de aspectos técnicos en el sistema judicial. La
                            combinación de conocimientos especializados, imparcialidad y rigor profesional contribuye
                            significativamente a la resolución de disputas, la garantía de la seguridad y la promoción de la
                            justicia.
                            </p>
                        </div>

                        {/* Image */}
                        <Image
                            className="rounded-xl w-full lg:max-w-md lg:max-w-lg object-cover"
                            src="/assets/papeles.jpg"
                            width={1100}
                            height={900}
                            alt="Peritajes"
                            objectFit="cover"
                        />
                        </div>
                        <div className="container m-auto py-5 mt-12">
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold text-main-200">Servicios Ofrecidos</h3>
                            <ul className="list-disc list-inside mt-4 text-gray-700">
                                <li className="md:text-xl">Peritajes inmobiliarios</li>
                                <li className="md:text-xl">Peritajes industriales</li>
                                <li className="md:text-xl">Peritajes financieros</li>
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold text-main-200">Tipos de Peritajes Realizados</h3>
                            <p className="mt-4 md:text-xl text-gray-700">Realizamos diversos tipos de peritajes para satisfacer las necesidades específicas de nuestros clientes:</p>
                            <ul className="list-disc list-inside mt-4 text-gray-700">
                                <li className="md:text-xl">Evaluación de daños</li>
                                <li className="md:text-xl">Tasaciones de bienes inmuebles</li>
                                <li className="md:text-xl">Análisis de riesgos</li>
                                <li className="md:text-xl">Auditorías técnicas</li>
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold text-main-200">Metodología</h3>
                            <p className="mt-4 md:text-xl text-gray-700">Utilizamos un enfoque riguroso y sistemático para asegurar la precisión y confiabilidad de nuestros peritajes. Nuestro proceso incluye:</p>
                            <ul className="list-disc list-inside mt-4 text-gray-700">
                                <li className="md:text-xl">Recolección y análisis de datos detallados</li>
                                <li className="md:text-xl">Uso de herramientas y técnicas avanzadas</li>
                                <li className="md:text-xl">Informe detallado y claro con conclusiones y recomendaciones</li>
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold text-main-200">Beneficios</h3>
                            <p className="mt-4 md:text-xl text-gray-700">Al elegir nuestros servicios de peritaje, obtendrás:</p>
                            <ul className="list-disc list-inside mt-4 text-gray-700">
                                <li className="md:text-xl">Informes precisos y detallados</li>
                                <li className="md:text-xl">Asesoramiento experto y confiable</li>
                                <li className="md:text-xl">Decisiones fundamentadas basadas en análisis objetivos</li>
                                <li className="md:text-xl">Reducción de riesgos y mayor seguridad</li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-800">Contacto</h3>
                            <p className="mt-4 text-gray-700">¿Necesitas un peritaje? Contáctanos hoy para obtener más información y solicitar nuestros servicios.</p>
                            <a href="/contactame" className="mt-6 inline-block bg-main-100 hover:bg-main-200 text-white py-2 px-4 rounded-lg">Contáctanos</a>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}