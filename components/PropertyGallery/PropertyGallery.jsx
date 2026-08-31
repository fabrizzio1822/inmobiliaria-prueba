'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import { IoClose } from 'react-icons/io5';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PropertyGallery = ({ photos = [], location = "Ubicación" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const openModal = (index) => {
    setInitialSlide(index);
    setIsModalOpen(true);
    if (typeof window !== "undefined") document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (typeof window !== "undefined") document.body.style.overflow = 'auto';
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-64 md:h-[500px] bg-gray-100 flex items-center justify-center text-gray-400">
        No hay imágenes disponibles
      </div>
    );
  }

  // Desktop Layout logic
  const renderDesktopGrid = () => {
    const total = photos.length;
    if (total === 1) {
      return (
        <div className="hidden md:block w-full h-[500px] overflow-hidden relative cursor-pointer" onClick={() => openModal(0)}>
          <Image src={photos[0].image} alt={`Foto 1 - ${location}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 1200px) 100vw, 1200px" priority />
        </div>
      );
    }
    
    if (total === 2) {
      return (
        <div className="hidden md:flex gap-2 h-[500px] overflow-hidden">
          {photos.slice(0, 2).map((p, i) => (
            <div key={i} className="relative w-1/2 h-full cursor-pointer overflow-hidden group" onClick={() => openModal(i)}>
              <Image src={p.image} alt={`Foto ${i + 1} - ${location}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" priority={i === 0} />
            </div>
          ))}
        </div>
      );
    }

    if (total === 3) {
      return (
        <div className="hidden md:flex gap-2 h-[500px] overflow-hidden">
          <div className="w-1/2 relative cursor-pointer overflow-hidden group" onClick={() => openModal(0)}>
            <Image src={photos[0].image} alt={`Foto 1 - ${location}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" priority />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            {photos.slice(1, 3).map((p, i) => (
              <div key={i+1} className="relative h-1/2 w-full cursor-pointer overflow-hidden group" onClick={() => openModal(i+1)}>
                <Image src={p.image} alt={`Foto ${i + 2} - ${location}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // >= 4 photos: exact match to the image design
    return (
      <div className="hidden md:flex gap-2 h-[450px] lg:h-[550px] overflow-hidden">
        {/* Left Big Image (50%) */}
        <div className="w-1/2 relative cursor-pointer overflow-hidden group" onClick={() => openModal(0)}>
          <Image src={photos[0].image} alt={`Foto 1 - ${location}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" priority />
        </div>
        
        {/* Middle Column (2 stack, 25%) */}
        <div className="w-1/4 flex flex-col gap-2">
           <div className="relative h-1/2 w-full cursor-pointer overflow-hidden group" onClick={() => openModal(1)}>
             <Image src={photos[1].image} alt={`Foto 2 - ${location}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
           </div>
           <div className="relative h-1/2 w-full cursor-pointer overflow-hidden group" onClick={() => openModal(2)}>
             <Image src={photos[2].image} alt={`Foto 3 - ${location}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
           </div>
        </div>

        {/* Right Column (25%) */}
        <div className="w-1/4 flex flex-col gap-2">
           <div className="relative flex-1 w-full cursor-pointer overflow-hidden group" onClick={() => openModal(3)}>
             <Image src={photos[3].image} alt={`Foto 4 - ${location}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
           </div>
           <div 
            className="relative h-12 lg:h-16 bg-main-100 flex items-center justify-between px-4 lg:px-6 text-white cursor-pointer hover:bg-main-200 transition-colors shrink-0" 
            onClick={() => openModal(0)}
           >
               <span className="text-sm font-medium">Ver todas las fotos</span>
               <span className="text-sm text-gray-400">{total}</span>
           </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderDesktopGrid()}

      {/* Mobile Swipeable Carousel */}
      <div className="md:hidden w-full h-[350px] overflow-hidden relative">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="w-full h-full"
        >
          {photos.map((p, i) => (
            <SwiperSlide key={i} onClick={() => openModal(i)}>
              <div className="relative w-full h-full">
                <Image src={p.image} alt={`Foto ${i + 1} - ${location}`} fill className="object-cover" sizes="100vw" priority={i === 0} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-2 md:p-4">
          <button onClick={closeModal} className="absolute top-4 right-4 z-[60] text-white bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors">
            <IoClose size={24} />
          </button>
          
          <div className="w-full h-full relative flex items-center justify-center">
            <Swiper
              modules={[Navigation, Keyboard, Mousewheel, Pagination]}
              initialSlide={initialSlide}
              navigation
              pagination={{ type: 'fraction', el: '.swiper-pagination-custom', renderFraction: function (currentClass, totalClass) { return `<span class="${currentClass}"></span> de <span class="${totalClass}"></span>`; } }}
              keyboard={{ enabled: true }}
              mousewheel={{ forceToAxis: true }}
              className="w-full h-full"
            >
              {photos.map((p, i) => (
                <SwiperSlide key={`modal-${i}`}>
                  <div className="relative w-full h-full flex items-center justify-center p-4 pb-12 md:p-12">
                    <Image src={p.image} alt={`Foto ${i + 1} - ${location}`} fill className="object-contain" sizes="100vw" />
                  </div>
                </SwiperSlide>
              ))}
               <div className="swiper-pagination-custom absolute bottom-4 left-0 w-full text-center text-white text-sm z-10"></div>
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
