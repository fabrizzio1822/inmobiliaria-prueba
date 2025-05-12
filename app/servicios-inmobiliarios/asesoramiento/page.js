
import Image from "next/image";
import { fetchTokkoProperties } from "@/lib/tokkoApi";
import Link from "next/link";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import { Location } from 'akar-icons';
import { FaCamera } from 'react-icons/fa'; 
import { TransitionPage } from "@/components/TransitionPage";
export default async function Asesoramiento (){

    const propiedades = await fetchTokkoProperties();

    return (
        <div className=" container mx-auto" >
            <TransitionPage/>
           <div className="flex px-4 flex-col lg:flex-row sm:py-12 gap-8 md:gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex flex-col justify-center flex-1">
              <h2 className="sm:text-4xl text-2xl py-4 font-bold text-zinc-700">
                ASESORAMIENTO INTEGRAL EN COMPRA Y VENTA DE PROPIEDADES
              </h2>
              <hr className="bg-main-100 max-w-sm h-[5px] my-2" /> {/* Ajusté el grosor del hr y el margen vertical */}
              <p className="py-4 md:text-lg text-gray-700">
                El servicio de asesoramiento en la compra y venta de propiedades desempeña un papel crucial al
                brindar orientación especializada a clientes que buscan realizar transacciones inmobiliarias. Este
                servicio integral, proporcionado por una profesional en bienes raíces, abarca desde la
                identificación de oportunidades hasta la gestión de cierres exitosos.
              </p>
            </div>

            {/* Image */}
            <Image
              className="rounded-xl w-full lg:max-w-md lg:max-w-lg object-cover"
              src="/assets/planos.jpg"
              width={700}
              height={500}
              alt="Planos de propiedades"
            />
          </div>
            <h2 className="text-3xl px-4 text-bold font-bold text-main-100 py-3">Viviendas</h2>
            <hr className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-6 my-5 py-4">
            {propiedades.map((property) => (
                 (
                  <div key={property.id} className="border rounded-lg shadow-lg overflow-hidden flex flex-col bg-white min-h-[500px]">
                        <Link href={`/propiedades/${property.id}`} className="flex flex-col h-full group">
                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={property.photos?.[0]?.image || "/placeholder.jpg"}
                          alt={property.publication_title || "Imagen de la propiedad"}
                          className="w-full h-full object-cover rounded-t-lg transform group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Etiqueta de Operación (Venta/Alquiler) */}
                        {property.operations?.[0]?.operation_type && (
                          <span className="absolute top-2 left-2 bg-main-100 text-white px-3 py-1 text-xs font-semibold rounded shadow">
                            {property.operations[0].operation_type}
                          </span>
                        )}
                        {/* Icono de la cámara y contador de fotos */}
                        {property.photos && property.photos.length > 0 && (
                          <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-70 text-white rounded-md p-1 flex items-center text-xs">
                            <FaCamera className="mr-1" size={14} />
                            <span>{property.photos.length}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex items-center gap-1 mb-2">
                          <Location strokeWidth={2} size={18} className="text-bordo flex-shrink-0" />
                          <h2 className="text-sm text-gray-600 truncate" title={property.address}>
                            {property.address || "Dirección no disponible"}
                          </h2>
                        </div>
                        <h3 className="text-md font-semibold text-gray-800 mb-1 min-h-[40px] group-hover:text-bordo transition-colors duration-150">
                          {property.publication_title || "Título no disponible"}
                        </h3>

                        {/* Precio */}
                        <p className="text-bordo font-bold text-lg mb-2">
                          {property.operations?.[0]?.prices?.[0]?.price
                            ? `${property.operations[0].prices[0].price.toLocaleString('es-AR', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0, // Sin decimales para precios grandes
                              })} ${property.operations[0].prices[0].currency}`
                            : "Consultar precio"}
                        </p>

                        <p className="text-gray-500 text-xs mb-3 capitalize">
                          {property.type?.name || "Tipo no especificado"}
                          {property.location?.name && ` en ${property.location.name}`}
                        </p>

                        {/* Características */}
                        <div className="mt-auto pt-3 border-t border-gray-200">
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-700">
                            {property.suite_amount > 0 && (
                              <div className="flex items-center">
                                <LiaBedSolid className="mr-1 text-bordo" size={16}/>
                                <span>{property.suite_amount} Dorm.</span>
                              </div>
                            )}
                            {property.bathroom_amount > 0 && (
                              <div className="flex items-center">
                                <LiaBathSolid className="mr-1 text-bordo" size={16}/>
                                <span>{property.bathroom_amount} Baño(s)</span>
                              </div>
                            )}
                            {(parseFloat(property.surface) > 0 || parseFloat(property.total_surface) > 0 || parseFloat(property.roofed_surface) > 0) && (
                              <div className="flex items-center">
                                <LiaRulerCombinedSolid className="mr-1 text-bordo" size={16}/>
                                <span>
                                  {/* Mostrar superficie cubierta si existe, sino la total o la 'surface' */}
                                  {parseFloat(property.roofed_surface) > 0 ? property.roofed_surface :
                                    parseFloat(property.total_surface) > 0 ? property.total_surface :
                                    property.surface} m²
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
            ))}
            </div>

        </div>
    )
}
