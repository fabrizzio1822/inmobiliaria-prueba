'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PhotoSlider = ({ photos }) => {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const modalPrevRef = useRef(null);
  const modalNextRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlideIndex, setInitialSlideIndex] = useState(0);

  useEffect(() => {

  }, []);

  const openModal = (index) => {
    setInitialSlideIndex(index);
    setIsModalOpen(true);
    if (typeof window !== "undefined") {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (typeof window !== "undefined") {
      document.body.style.overflow = 'auto';
    }
  };

  const showImageMain = (src, title) => (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <Image
        src={src}
        layout="fill"
        objectFit="contain"
        alt={title}
      />
    </div>
  );

  const showImageModal = (src, title) => (
    <div className="relative w-full h-full"> 
      <Image
        src={src}
        layout="fill"
        objectFit="contain" 
        alt={title}
        priority 
      />
    </div>
  );


  return (
    <>
      {/* Contenedor del Slider Principal */}
      <div className="w-full max-w-5xl mx-auto relative">
        {/* Flechas Personalizadas - Slider Principal (estilo original) */}
        {photos?.length > 1 && (
          <>
            <div
              ref={prevRef}
              className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full cursor-pointer shadow hover:bg-opacity-100 transition"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div
              ref={nextRef}
              className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full cursor-pointer shadow hover:bg-opacity-100 transition"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </>
        )}

        {/* Swiper Principal (configuración original) */}
        {photos?.length > 0 ? (
          <Swiper
            cssMode={true} 
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            onInit={(swiper) => {
              if (swiper.navigation && typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation.prevEl && swiper.params.navigation.nextEl) {
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            pagination={{ clickable: true }} 
            mousewheel={true}
            keyboard={true} 
            modules={[Navigation, Pagination, Mousewheel, Keyboard]} 
            breakpoints={{ 
              320: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 1, spaceBetween: 15 },
              1024: { slidesPerView: 1, spaceBetween: 15 },
            }}
            className="w-full h-[600px] cursor-pointer" 
            loop={photos.length > 1} 
          >
            {photos.map((photo, index) => (
              <SwiperSlide
                key={`main-${photo.id || index}`}
                onClick={() => openModal(index)} 
                className="flex justify-center items-center " 
              >
                {showImageMain(photo.image, photo.title || `Foto ${index + 1}`)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          
          <div className="relative w-full h-[600px] overflow-hidden rounded-2xl bg-gray-200 flex justify-center items-center">
            <Image
              src="/placeholder.jpg" 
              layout="fill"
              objectFit="contain"
              alt="No hay imágenes disponibles"
            />
          </div>
        )}
      </div>

      {/* Modal con Slider */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-[1000] p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-transparent w-full h-full max-w-screen-xl max-h-screen-xl relative flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 md:top-5 md:right-5 z-[1001] text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors"
              aria-label="Cerrar galería"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full h-[90%] md:h-[95%] relative">
                {photos?.length > 1 && (
                    <>
                        <div
                            ref={modalPrevRef}
                            className="absolute top-1/2 left-1 md:left-3 transform -translate-y-1/2 z-[1002] bg-white/60 hover:bg-white/90 p-2.5 rounded-full cursor-pointer shadow-lg transition"
                        >
                            <svg className="w-7 h-7 md:w-8 md:h-8 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div
                            ref={modalNextRef}
                            className="absolute top-1/2 right-1 md:right-3 transform -translate-y-1/2 z-[1002] bg-white/60 hover:bg-white/90 p-2.5 rounded-full cursor-pointer shadow-lg transition"
                        >
                            <svg className="w-7 h-7 md:w-8 md:h-8 text-gray-900" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </>
                )}

                <Swiper
                    modules={[Navigation, Pagination, Keyboard, Mousewheel]}
                    initialSlide={initialSlideIndex}
                    navigation={{
                        prevEl: modalPrevRef.current,
                        nextEl: modalNextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        if (typeof swiper.params.navigation !== 'boolean') {
                            swiper.params.navigation.prevEl = modalPrevRef.current;
                            swiper.params.navigation.nextEl = modalNextRef.current;
                        }
                    }}
                     onInit={(swiper) => {
                        if (swiper.navigation) {
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                        if (swiper.pagination) {
                            swiper.pagination.init();
                            swiper.pagination.update();
                        }
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        el: '.swiper-pagination-modal'
                    }}
                    keyboard={{ enabled: true }}
                    mousewheel={{ forceToAxis: true }}
                    grabCursor={true}
                    loop={photos.length > 1}
                    spaceBetween={20}
                    slidesPerView={1}
                    className="w-full h-full"
                    style={{
                        '--swiper-navigation-color': '#E0E0E0',
                        '--swiper-pagination-color': '#FFFFFF',
                        '--swiper-pagination-bullet-inactive-color': '#A0A0A0',
                        '--swiper-pagination-bullet-inactive-opacity': '0.5',
                        '--swiper-pagination-bullet-size': '10px',
                        
                    }}
                >
                    {photos.map((photo, index) => (
                    <SwiperSlide key={`modal-${photo.id || index}`} className="flex justify-center items-center">
                        <div className="w-full h-full flex justify-center items-center p-2 sm:p-4 md:p-8">
                            {showImageModal(photo.image, photo.title || `Foto ${index + 1}`)}
                        </div>
                    </SwiperSlide>
                    ))}
                    <div className="swiper-pagination swiper-pagination-modal absolute bottom-4 left-[50%] !mx-auto w-fit"></div>
                </Swiper>
            </div>
            {photos[initialSlideIndex]?.title && (
                <div className="text-center text-white mt-2 text-sm md:text-base bg-black/30 px-2 py-1 rounded">
                    {photos[initialSlideIndex].title}
                </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoSlider;
