'use client';
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { Navbar } from '../Navbar/Navbar';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="lg:container lg:mx-auto mx-2 mb-5 mt-3">
            <div className="flex items-center justify-between px-5 lg:px-0">
                <Link href='/'> 
                    <Image
                        src='/assets/logo1.png'
                        width={310}
                        height={900}
                        alt="Logo"
                        className=' sm:max-w-[270px] lg:max-w-[310px]'
                    />
                </Link>
                <Navbar/>
                <div className="bars__menu " onClick={handleMenuClick}>
                    <span className={`line1__bars-menu ${menuOpen ? 'activeline1__bars-menu' : ''}`}></span>
                    <span className={`line2__bars-menu ${menuOpen ? 'activeline2__bars-menu' : ''}`}></span>
                    <span className={`line3__bars-menu ${menuOpen ? 'activeline3__bars-menu' : ''}`}></span>
                </div>
                
                <div className='flex items-center gap-2 md:gap-5 hidden lg:block lg:flex'>
                        <Link href='/contactame' className='px-3 py-2 text-white rounded-lg bg-main-100 hover:bg-main-200'>
                            Contactame
                        </Link>
                </div>
            </div>
            <div className={`z-[999] barra-desplegable ${menuOpen ? 'show' : ''}`}>
                    <ul>
                        <li><a className='py-4 text-lg ml-4' href="/">Inicio</a></li>
                        <span className='color-gris text-sm mx-3 my-2'>Servicios Inmobiliarios</span><hr/>
                        <li><a className='py-4 text-lg ml-4' href="/servicios-inmobiliarios/asesoramiento">Asesoramiento compra y venta</a></li>
                        <li><a className='py-4 text-lg ml-4' href="/servicios-inmobiliarios/evaluacion">Evaluación de proyectos</a></li>
                        <span className='color-gris text-sm mx-3 my-2'>Otros Servicios</span><hr/>
                        <li><a className='py-4 text-lg ml-4' href="/peritajes">Peritajes</a></li>
                        <li><a className='py-4 text-lg ml-4' href="/tasaciones">Tasaciones</a></li>
                        <hr/>
                        <li><a className='py-4 text-lg ml-4' href="/propiedad">Propiedades</a></li>
                        <li><a className='py-4 text-lg ml-4' href="/alquileres">Alquileres</a></li>
                        <hr/>

                        <li><a className='py-2 text-lg ml-2 bg-main-100 px-4 text-white rounded-3xl ' href="/contactame">Contactame</a></li>

                    </ul>
                </div>
        </div>
    );
}


