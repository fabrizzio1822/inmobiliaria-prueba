'use client'
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/Header";
import { TransitionPage } from "@/components/TransitionPage";
import Image from 'next/image'
import { Footer } from "@/components/Footer";
export default function Peritajes() {
    return (
        <SessionProvider>
            <TransitionPage />
            <div className="font-sans antialiased text-gray-900">
                <Header />
                <section className="sm:py-12">
                    <div className="mx-auto px-6">
                     
                    <div className="servicios-contenedor ">
                        <div id="texto-derecha" className="servicios-contenedor-texto">
                        <h1 className="titulo-servicio text-4xl py-4 font-bold color-gris">PERITAJES</h1>
                        <hr/>
                        <p className="py-4 color-gris text-start">En el ámbito profesional, el peritaje emerge como una disciplina crucial para garantizar la objetividad, precisión y confianza en la evaluación de diversos servicios. Contribuye a aclarar hechos complejos y a facilitar la comprensión de aspectos técnicos en el sistema judicial. La combinación de conocimientos especializados, imparcialidad y rigor profesional contribuye significativamente a la resolución de disputas, la garantía de la seguridad y la promoción de la justicia.</p>
                        </div>
                        <Image 
                        src='/assets/papeles.jpg'
                        width={1100}
                        height={900}
                        />
                    </div>
                        <div className="container m-auto py-5 mt-12">
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold color-bordo">Servicios Ofrecidos</h3>
                            <ul className="list-disc list-inside mt-4 text-gray-700">
                                <li className="md:text-xl">Peritajes inmobiliarios</li>
                                <li className="md:text-xl">Peritajes industriales</li>
                                <li className="md:text-xl">Peritajes financieros</li>
                                <li className="md:text-xl">Peritajes de seguros</li>
                                <li className="md:text-xl">Peritajes forenses</li>
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold color-bordo">Tipos de Peritajes Realizados</h3>
                            <p className="mt-4 md:text-xl text-gray-700">Realizamos diversos tipos de peritajes para satisfacer las necesidades específicas de nuestros clientes:</p>
                            <ul className="list-disc list-inside mt-4 text-gray-700">
                                <li className="md:text-xl">Evaluación de daños</li>
                                <li className="md:text-xl">Tasaciones de bienes inmuebles</li>
                                <li className="md:text-xl">Análisis de riesgos</li>
                                <li className="md:text-xl">Auditorías técnicas</li>
                                <li className="md:text-xl">Investigaciones forenses</li>
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold color-bordo">Metodología</h3>
                            <p className="mt-4 md:text-xl text-gray-700">Utilizamos un enfoque riguroso y sistemático para asegurar la precisión y confiabilidad de nuestros peritajes. Nuestro proceso incluye:</p>
                            <ul className="list-disc list-inside mt-4 text-gray-700">
                                <li className="md:text-xl">Recolección y análisis de datos detallados</li>
                                <li className="md:text-xl">Uso de herramientas y técnicas avanzadas</li>
                                <li className="md:text-xl">Informe detallado y claro con conclusiones y recomendaciones</li>
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold color-bordo">Beneficios</h3>
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
                            <a href="/contactame" className="mt-6 inline-block bg-bordo text-white py-2 px-4 rounded-lg">Contáctanos</a>
                        </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </SessionProvider>
    );
}