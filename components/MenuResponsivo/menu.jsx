"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className=" lg:hidden">
      {/* Botón de hamburguesa */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
      </button>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" onClick={toggleMenu} />}

      {/* Menú lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Menú</h2>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                    Productos
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
