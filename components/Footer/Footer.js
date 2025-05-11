'use client';
import Link from "next/link";
import Image from "next/image";
import { dataHeader } from "@/components/Header/Header.data"; // Importa tu objeto de navegación
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Importa iconos de contacto

export const Footer = () => {
  return (
    <div className="w-full py-16 lg:py-24  bg-foreground text-background">
      <div className="container overflow-hidden mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          {/* Columna del Logo y Descripción */}
          <div className="flex gap-8 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <Image
                src='/assets/logo-footer.webp'
                width={350} // Ajusta el ancho según necesites
                height={100} // Ajusta la altura según necesites
                alt="Logo Inmobiliaria"
                className=''
              />
              <p className="text-lg max-w-md leading-relaxed tracking-tight text-background/75 text-left">
                Te ayudo en la búsqueda de la propiedad ideal y la gestión integral de tus bienes raíces.
              </p>
            </div>
            {/* Información de Contacto */}
            <div className="flex gap-4 flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
              <p className="flex items-center gap-2"><FaMapMarkerAlt /> Neuquén, Argentina</p>
              <p className="flex items-center gap-2"><FaPhone /> +54 9 299 - 154 213 223</p>
              <p className="flex items-center gap-2"><FaEnvelope /> marialaurabobadilla@outlook.com</p>
            </div>
          </div>

          {/* Columnas de Navegación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Sección de Servicios Inmobiliarios */}
            <div>
              <p className="text-xl font-semibold mb-4">Servicios Inmobiliarios</p>
              <div className="flex flex-col gap-2">
                {dataHeader
                  .find((item) => item.name === 'Servicios Inmobiliarios')
                  ?.submenu?.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.link}
                      className="text-background/75 hover:text-bordo transition-colors"
                    >
                      {subItem.name}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Sección de Otros Servicios */}
            <div>
              <p className="text-xl font-semibold mb-4">Otros Servicios</p>
              <div className="flex flex-col gap-2">
                {dataHeader
                  .find((item) => item.name === 'Otros Servicios')
                  ?.submenu?.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.link}
                      className="text-background/75 hover:text-bordo transition-colors"
                    >
                      {subItem.name}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Enlaces Directos */}
            <div>
              <p className="text-xl font-semibold mb-4">Enlaces</p>
              <div className="flex flex-col gap-2">
                {dataHeader
                  .filter((item) => !item.submenu && item.link)
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="text-background/75 hover:text-bordo transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                <Link href="/contacto" className="text-background/75 hover:text-bordo transition-colors">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="max-w-xl  mx-auto mt-20 "/>
      <div className="w-full bg-foreground/90 text-background/75 py-4 text-center text-sm mt-24">
        <p>© {new Date().getFullYear()} - Maria Laura Bobadilla. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};