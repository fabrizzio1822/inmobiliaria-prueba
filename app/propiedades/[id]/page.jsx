import { fetchTokkoPropertyById } from "@/lib/tokkoApi";
import Image from "next/image";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import { TfiLocationPin } from "react-icons/tfi";
import PhotoSlider from "@/components/PhotoSlider/PhotoSlider";
import React from "react";
import Footer from "@/components/Footer/Footer";
export default async function Propiedad({ params }) {
  const property = await fetchTokkoPropertyById(params.id);

  if (!property) {
    return <div>Propiedad no encontrada</div>;
  }
  
  return (
    <div>
      <main className="max-w-6xl container pb-12 mx-auto">
      <div className="grid grid-cols-1 m-auto my-3 py-5">
          <p>
            {property.operations[0]?.operation_type}
          </p>
        <div className="px-6">
          <h1 className="text-3xl mb-4 text-secondary flex justify-between">
            <span className="text-main-100 " >{property.type?.name}</span>
            {property.operations[0]?.prices[0]?.price && (
              <p className="text-main-100 font-bold">
              {property.operations[0]?.prices[0]?.price?.toLocaleString('es-AR', {
                minimumFractionDigits: 0, // O el número de decimales que quieras mostrar
                maximumFractionDigits: 2, // O el número máximo de decimales
              })}
              {' '}
              {property.operations[0]?.prices[0]?.currency}
            </p>
            )}
          </h1>

          <div className="flex gap-5 my-4">
            <h2 className="flex gap-3 text-xl items-center">
              <TfiLocationPin />
              {property.location?.name}
            </h2>
          </div>

          {property.photos && property.photos.length > 0 ? (
            <div className="my-4">
                <div className="my-4">
                  <PhotoSlider photos={property.photos} /> {/* Pasa el array de fotos como prop */}
                </div>
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              No hay imágenes disponibles
            </div>
          )}

          <div className="gap-4 lg:flex mt-4">
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

          <div className="my-3 prose">
          {property.description.split(/\r\n|\r|\n/).map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              {index < property.description.split(/\r\n|\r|\n/).length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        </div>
      </div>
      
    </main>
    <Footer/>
    </div>
  );
}