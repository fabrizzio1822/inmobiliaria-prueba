'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '../Navbar/Navbar';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Prevenir el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`w-full z-40 ${isHomePage ? 'absolute top-0 left-0 bg-transparent' : 'relative bg-white shadow-sm'}`}>
        <div className="mx-auto py-2 px-6 md:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-50">
              <Image
                src="/assets/logo3.png"
                width={310}
                height={90}
                alt="Logo"
                className={`transition-all duration-300 max-w-[180px] sm:max-w-[270px] lg:max-w-[250px] ${isHomePage ? '' : ''} ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
            </Link>
            <Navbar theme={isHomePage ? "light" : "dark"} />

            {/* Menú principal (oculto en móviles) */}
            <div className="hidden lg:flex items-center gap-5">
              <Link
                href="/contactame"
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isHomePage
                  ? 'text-white bg-transparent border border-white hover:bg-main-100 hover:border-main-100'
                  : 'text-white bg-main-100 hover:bg-main-200'
                  }`}
              >
                Contactame
              </Link>
            </div>

            {/* Botón Menú Hamburguesa (visible en móviles) */}
            <button
              onClick={handleMenuClick}
              className={`lg:hidden relative z-50 hover:opacity-80 focus:outline-none ${isHomePage ? 'text-white' : 'text-gray-900'}`}
              aria-label="Menú"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-8 w-8 text-white" />
              ) : (
                <Menu className={`h-8 w-8 ${isHomePage ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menú Full Screen */}
      <div
        className={`fixed inset-0 z-[100] bg-main-100 transition-all duration-500 ease-in-out lg:hidden flex flex-col justify-center items-center ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-4 right-6 p-2 text-white hover:opacity-80 focus:outline-none"
        >
          <X className="h-8 w-8" />
        </button>
        <ul className="w-full px-8 text-center flex flex-col items-center justify-center h-full">
          <li className="w-full mb-4">
            <Link href="/" className="block py-3 text-2xl font-semibold text-white hover:text-white/80 transition-colors" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li className="w-full mt-6 mb-4">
            <span className="text-sm font-medium text-white/60 uppercase tracking-widest">Servicios Inmobiliarios</span>
          </li>
          <li className="w-full mb-3">
            <Link
              href="/servicios-inmobiliarios/asesoramiento"
              className="block py-2 text-xl font-medium text-white/90 hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Asesoramiento
            </Link>
          </li>
          <li className="w-full mb-3">
            <Link
              href="/servicios-inmobiliarios/evaluacion"
              className="block py-2 text-xl font-medium text-white/90 hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Evaluación de proyectos
            </Link>
          </li>
          <li className="w-full mb-3">
            <Link href="/peritajes" className="block py-2 text-xl font-medium text-white/90 hover:text-white transition-colors" onClick={closeMenu}>
              Peritajes
            </Link>
          </li>
          <li className="w-full mb-6">
            <Link href="/tasaciones" className="block py-2 text-xl font-medium text-white/90 hover:text-white transition-colors" onClick={closeMenu}>
              Tasaciones
            </Link>
          </li>
          <li className="w-full mt-4 mb-4">
            <span className="text-sm font-medium text-white/60 uppercase tracking-widest">Inmuebles</span>
          </li>
          <li className="w-full mb-3">
            <Link href="/ventas" className="block py-2 text-xl font-medium text-white/90 hover:text-white transition-colors" onClick={closeMenu}>
              Venta
            </Link>
          </li>
          <li className="w-full mb-3">
            <Link href="/alquileres" className="block py-2 text-xl font-medium text-white/90 hover:text-white transition-colors" onClick={closeMenu}>
              Alquiler
            </Link>
          </li>
          <li className="w-full mb-8">
            <Link href="/propiedad" className="block py-2 text-xl font-medium text-white/90 hover:text-white transition-colors" onClick={closeMenu}>
              Ver todas
            </Link>
          </li>
          <li className="w-full mt-auto mb-10">
            <Link
              href="/contactame"
              className="block w-full py-4 text-xl font-semibold bg-white text-main-100 rounded-xl shadow-lg hover:bg-gray-100 transition-all"
              onClick={closeMenu}
            >
              Contactame
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}