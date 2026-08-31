'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../Navbar/Navbar';
import { Menu, X } from 'lucide-react';

export default function NavbarFixed() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Mostrar el navbar al scrollear hacia arriba, y bloquear scroll si el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300 && currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        if (menuOpen) setMenuOpen(false); // cierra el menú si se hace scroll hacia abajo (aunque el scroll suele estar bloqueado cuando está abierto)
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  const handleMenuClick = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-[60] transition-transform duration-300 ${
          isVisible || menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto py-2 px-6 md:px-10">
          <div className="flex items-center justify-between">
            {/* Logo oscuro */}
            <Link href="/" className="flex-shrink-0 relative z-[70]">
              <Image
                src="/assets/logo1.png"
                width={310}
                height={90}
                alt="Logo"
                className={`transition-all duration-300 max-w-[180px] sm:max-w-[270px] lg:max-w-[250px] ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
            </Link>
            
            <Navbar theme="dark" />
            
            {/* Menú principal (oculto en móviles) */}
            <div className="hidden lg:flex items-center gap-5">
              <Link
                href="/contactame"
                className="px-4 py-2 text-white bg-main-100 rounded-lg hover:bg-main-200 transition-colors"
              >
                Contactame
              </Link>
            </div>

            {/* Botón Menú Hamburguesa (visible en móviles) */}
            <button
              onClick={handleMenuClick}
              className="lg:hidden relative z-[70] text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Menú"
            >
              {menuOpen ? <X className="h-8 w-8 text-gray-900" /> : <Menu className="h-8 w-8 text-gray-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Full Screen para NavbarFixed */}
      <div 
        className={`fixed inset-0 z-[50] bg-white transition-all duration-500 ease-in-out lg:hidden flex flex-col justify-center items-center ${
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <ul className="w-full px-8 text-center flex flex-col items-center justify-center h-full pt-16">
          <li className="w-full mb-4">
            <Link href="/" className="block py-3 text-2xl font-semibold text-gray-900 hover:text-main-100 transition-colors" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li className="w-full mt-6 mb-4">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Servicios Inmobiliarios</span>
          </li>
          <li className="w-full mb-3">
            <Link
              href="/servicios-inmobiliarios/asesoramiento"
              className="block py-2 text-xl font-medium text-gray-700 hover:text-main-100 transition-colors"
              onClick={closeMenu}
            >
              Asesoramiento
            </Link>
          </li>
          <li className="w-full mb-3">
            <Link
              href="/servicios-inmobiliarios/evaluacion"
              className="block py-2 text-xl font-medium text-gray-700 hover:text-main-100 transition-colors"
              onClick={closeMenu}
            >
              Evaluación de proyectos
            </Link>
          </li>
          <li className="w-full mb-3">
            <Link href="/peritajes" className="block py-2 text-xl font-medium text-gray-700 hover:text-main-100 transition-colors" onClick={closeMenu}>
              Peritajes
            </Link>
          </li>
          <li className="w-full mb-6">
            <Link href="/tasaciones" className="block py-2 text-xl font-medium text-gray-700 hover:text-main-100 transition-colors" onClick={closeMenu}>
              Tasaciones
            </Link>
          </li>
          <li className="w-full mt-4 mb-4">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Inmuebles</span>
          </li>
          <li className="w-full mb-3">
            <Link href="/ventas" className="block py-2 text-xl font-medium text-gray-700 hover:text-main-100 transition-colors" onClick={closeMenu}>
              Venta
            </Link>
          </li>
          <li className="w-full mb-3">
            <Link href="/alquileres" className="block py-2 text-xl font-medium text-gray-700 hover:text-main-100 transition-colors" onClick={closeMenu}>
              Alquiler
            </Link>
          </li>
          <li className="w-full mb-8">
            <Link href="/propiedad" className="block py-2 text-xl font-medium text-gray-700 hover:text-main-100 transition-colors" onClick={closeMenu}>
              Ver todas
            </Link>
          </li>
          <li className="w-full mt-auto mb-10">
            <Link
              href="/contactame"
              className="block w-full py-4 text-xl font-semibold bg-main-100 text-white rounded-xl shadow-lg hover:bg-main-200 transition-all"
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
