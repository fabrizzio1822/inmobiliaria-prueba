'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Menu, X } from 'lucide-react'; // Importa los iconos de Lucide

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white relative top-0 z-50">
      <div className="xl:container mx-auto p-3 ">
        <div className="flex  items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/logo1.png"
              width={310}
              height={90} // Ajusté la altura para mantener la proporción
              alt="Logo"
              className="max-w-[70vw] sm:max-w-[270px] lg:max-w-[310px]"
            />
          </Link>
          <Navbar />
          {/* Menú principal (oculto en móviles) */}
          <div className="hidden lg:flex items-center gap-5">

            <Link
              href="/contactame"
              className="px-3 py-2 text-white rounded-lg bg-main-100 hover:bg-main-200"
            >
              Contactame
            </Link>
          </div>

          {/* Botón Menú Hamburguesa (visible en móviles) */}
          <button
            onClick={handleMenuClick}
            className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none focus:shadow-outline-primary"
            aria-label="Menú"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            ) : (
              <Menu className="h-6 w-6 sm:h-8 sm:w-8" />
            )}
          </button>
        </div>

        {/* Menú desplegable responsivo */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white transition-all duration-500 overflow-hidden ${
            menuOpen ? 'min-h-screen py-4' : 'max-h-0'
          }`}
        >
          <ul className="px-4">
            <li>
              <Link href="/" className="block py-2 text-lg text-gray-800 hover:bg-gray-100" onClick={closeMenu}>
                Inicio
              </Link>
            </li>
            <li className="mt-2">
              <span className="text-sm text-gray-500">Servicios Inmobiliarios</span>
              <hr className="my-1" />
            </li>
            <li>
              <Link
                href="/servicios-inmobiliarios/asesoramiento"
                className="block py-2 text-lg text-gray-800 hover:bg-gray-100 ml-2"
                onClick={closeMenu}
              >
                Asesoramiento compra y venta
              </Link>
            </li>
            <li>
              <Link
                href="/servicios-inmobiliarios/evaluacion"
                className="block py-2 text-lg text-gray-800 hover:bg-gray-100 ml-2"
                onClick={closeMenu}
              >
                Evaluación de proyectos
              </Link>
            </li>
            <li className="mt-2">
              <span className="text-sm text-gray-500">Otros Servicios</span>
              <hr className="my-1" />
            </li>
            <li>
              <Link href="/peritajes" className="block py-2 text-lg text-gray-800 hover:bg-gray-100 ml-2" onClick={closeMenu}>
                Peritajes
              </Link>
            </li>
            <li>
              <Link href="/tasaciones" className="block py-2 text-lg text-gray-800 hover:bg-gray-100 ml-2" onClick={closeMenu}>
                Tasaciones
              </Link>
            </li>
            <li className="mt-2">
              <span className="text-sm text-gray-500"></span>
              <hr className="my-1" />
            </li>
            <li>
              <Link href="/propiedad" className="block py-2 text-lg text-gray-800 hover:bg-gray-100" onClick={closeMenu}>
                Propiedades
              </Link>
            </li>
            <li>
              <Link href="/alquileres" className="block py-2 text-lg text-gray-800 hover:bg-gray-100" onClick={closeMenu}>
                Alquileres
              </Link>
            </li>
            <hr className="my-2" />
            <li>
              <Link
                href="/contactame"
                className="block py-2 text-lg bg-main-100 px-4 text-white rounded-3xl inline-block mt-2"
                onClick={closeMenu}
              >
                Contactame
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}