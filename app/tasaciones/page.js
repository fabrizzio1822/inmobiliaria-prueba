'use client'
import { useState } from 'react';
import { SessionProvider } from "next-auth/react";

import { TransitionPage } from "@/components/TransitionPage";

import Image from 'next/image';
import Modal from '@/components/modal/Modal';
import { House } from 'lucide-react';

function TasacionesPagina() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <TransitionPage/>
            
            <div className='container mx-auto px-6'>
            <div className="flex flex-col lg:flex-row sm:py-12 gap-8 md:gap-12 lg:gap-20 max-w-7xl mx-auto">
                {/* Text Content */}
                <div className="flex flex-col justify-center flex-1">
                    <h1 className="sm:text-4xl text-2xl py-4 font-bold text-zinc-700">TASACIONES</h1>
                    <hr className="bg-main-100 max-w-sm h-[5px] my-2" />
                    <p className="py-4 text-gray-700 md:text-lg">
                    Los servicios de tasaciones desempeñan un papel crucial en el mundo financiero, inmobiliario y
                    empresarial al proporcionar evaluaciones precisas y confiables sobre el valor de diversos activos.
                    </p>
                </div>

                {/* Image */}
                <Image
                    className="rounded-xl w-full lg:max-w-md lg:max-w-lg object-cover"
                    src="/assets/tasacion.jpg"
                    width={1100}
                    height={900}
                    alt="Tasaciones"
                />
                </div>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Tasaciones</h1>
                    <div className="text-lg text-gray-600">
                        <p className="mb-6">¿Querés vender una Propiedad? Confía en la experiencia de un profesional inmobiliario que te guiará en el proceso de venta o alquiler de tu hogar. Estamos aquí para ayudarte a lograr tus objetivos de forma eficiente y obtener el mejor precio posible. Miles de clientes satisfechos respaldan nuestra trayectoria. Vende tu propiedad más rápido y obtén el mejor precio con nuestro equipo especializado.</p>
                        <h2 className="text-2xl font-bold mb-2">Queres tu tasación?</h2>
                        <h2 className="text-2xl font-bold mb-4">Dejalo en nuestras manos</h2>
                        <hr className="border-gray-300 mb-8" />
                        <div className="relative">
                            {isModalOpen && <Modal onClose={closeModal} />}
                            <button onClick={openModal} className="flex item-center justify-center gap-2 bg-main-100 text-white py-4 px-6 rounded-2xl font-bold hover:bg-main-200 transition duration-200">Quiero mi Tasación <House/> </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 rounded-xl my-10 ">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800">Más sobre Nuestros Servicios de Tasaciones</h2>
                        <p className="text-lg text-gray-600">En Inmobiliaria Bobadilla, ofrecemos servicios de tasación profesional adaptados a tus necesidades. Nuestro equipo de expertos está comprometido con proporcionar tasaciones precisas y confiables que te ayuden en el proceso de venta, compra o alquiler de propiedades.</p>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">¿Por qué Elegirnos?</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                <li>Experiencia y profesionalismo en el mercado inmobiliario.</li>
                                <li>Rapidez en la entrega de informes completos y detallados.</li>
                                <li>Asesoramiento personalizado y atención al cliente de primera calidad.</li>
                                <li>Garantía de satisfacción y resultados confiables.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">Tipos de Tasaciones que Ofrecemos</h3>
                            <p className="text-lg text-gray-600">Desde tasaciones para venta, compra o alquiler, hasta peritajes judiciales, nuestro equipo está capacitado para abordar una amplia gama de necesidades inmobiliarias. Nos aseguramos de que cada tasación sea llevada a cabo con precisión y rigor, cumpliendo con los estándares más altos de la industria.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default TasacionesPagina;