'use client';
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Person } from 'akar-icons';
import Loader from '../Loader/Loader';
import { Navbar } from '../Navbar/Navbar';

export function Header() {
    const { data, status } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="lg:container lg:mx-auto mx-2 mb-5 mt-3">
            <div className="flex items-center justify-between px-5 md:px-0">
            <Image
                                src='/assets/logo-titulo1.png'
                                width={1100}
                                height={900}
                                alt="Logo"
                                className='logo-titulo'
                            />
                <Navbar/>
                <div className="bars__menu " onClick={handleMenuClick}>
                    <span className={`line1__bars-menu ${menuOpen ? 'activeline1__bars-menu' : ''}`}></span>
                    <span className={`line2__bars-menu ${menuOpen ? 'activeline2__bars-menu' : ''}`}></span>
                    <span className={`line3__bars-menu ${menuOpen ? 'activeline3__bars-menu' : ''}`}></span>
                </div>
                
                <div className='flex items-center gap-2 md:gap-5 hidden lg:block lg:flex'>
                    {status === 'loading' ? (
                        <Loader />
                    ) : status === 'authenticated' ? (
                        <>
                            <Link
                                
                                href={`/dashboard/${
                                    data?.user?.role === "admin" ? "admin" : "user"
                                }`}
                                className='color-bordo'
                            >
                                <Person strokeWidth={2} size={36} />
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className='px-3 py-2 text-white rounded-lg bg-secondary hover:bg-black'
                            >
                                Salir
                            </button>
                        </>
                    ) : (
                        <Link href='/login' className='px-3 py-2 text-white rounded-lg bg-secondary hover:bg-black'>
                            Contactame
                        </Link>
                    )}
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
                        <li><a className='py-4 text-lg ml-4' href="/contactame">Contactame</a></li>
                        {status == 'loading' ? (
                             <Loader />
                        ) :
                        status == 'authenticated' ? (
                            <>
                            <li><a className=' text-lg ml-4' 
                            href={`/dashboard/${
                                data?.user?.role === "admin" ? "admin" : "user"
                            }`}>Perfil</a></li>
                            <button
                            onClick={() => signOut()}
                            className=' ml-4 mt-3 px-3 w-[50%] py-2 text-white rounded-lg bg-secondary hover:bg-black'
                        >
                            Salir
                        </button>
                        </>
                        ): (
                         <a href="/login" className='ml-4 mt-3 block px-3 w-[50%] py-2 text-white hover:text-white rounded-lg bg-secondary hover:bg-black pointer text-center' >
                            Ingresar
                            </a> 
                        )}

                    </ul>
                </div>
        </div>
    );
}


