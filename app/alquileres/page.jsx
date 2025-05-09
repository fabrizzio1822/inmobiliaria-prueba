import { fetchTokkoProperties } from "@/lib/tokkoApi";
import Link from "next/link";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import { Location } from 'akar-icons';

export default async function Alquileres (){

    const propiedades = await fetchTokkoProperties();

    return (
        <div className="" >
            <h2 className="text-center">Alquileres</h2>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-6 container mx-auto px-6 my-5 py-4">
            {propiedades.map((property) => (
                (property.operations[0]?.operation_type === 'Alquiler'  ? (
                    <div>
                    <Link key={property.id} href={`/propiedades/${property.id}`}>
                        <div key={property.id} className="flex flex-col rounded-lg shadow-md overflow-hidden min-h-[500px]">
                        <div className="relative h-60">
                            <img
                                src={property.photos[0].image|| "/placeholder.jpg"}
                                alt={property.title}
                                className="w-full h-60 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex gap-1 items-center">
                                <Location strokeWidth={2} size={20} className="color-bordo" /> 
                                <h2 className=" text-main-100">{property.address}</h2>
                            </div>
                            <p>{property.publication_title}</p>
                            <p>
                              {property.operations[0]?.prices[0]?.price?.toLocaleString('es-AR', {
                                minimumFractionDigits: 0, // O el número de decimales que quieras mostrar
                                maximumFractionDigits: 2, // O el número máximo de decimales
                              })}
                              {' '}
                              {property.operations[0]?.prices[0]?.currency}
                            </p>
                            <p className="text-gray-600">{property.location?.name}</p>
                            <p className="text-sm">{property.publication_type?.name}</p>
                            <div className="gap-4 mt-2 px-2 xl:flex">
                            {property.suite_amount > 0 && (
                              <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30">
                                <LiaBedSolid />
                                <span className="ml-2">{property.suite_amount}</span>
                              </div>
                            )}
                            {property.bathroom_amount > 0 && (
                              <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30">
                                <LiaBathSolid />
                                <span className="ml-2">{property.bathroom_amount}</span>
                              </div>
                            )}
                            {property.surface > 0 && (
                              <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30">
                                <LiaRulerCombinedSolid />
                                <span className="ml-2">{property.surface} m2</span>
                              </div>
                            )}
                        </div>   
                        </div>
                        </div>
                    </Link>
                </div>
                ):(
                    null
                ))
            ))}
            </div>

        </div>
    )
}
