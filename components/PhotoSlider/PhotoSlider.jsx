'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PhotoSlider = ({ photos }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    // Swiper requiere que los elementos existan antes de inicializar
  }, []);

  const showImage = (src, title) => (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <Image
        src={src}
        layout="fill"
        objectFit="contain"
        alt={title}
      />
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Custom Arrows */}
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

      {/* Swiper */}
      {photos?.length > 0 ? (
        <Swiper
          cssMode={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // Se requiere en Swiper 8+ para que reconozca los elementos
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
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
          className="w-full h-[600px]"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              {showImage(photo.image, `Foto ${index + 1}`)}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="relative w-full h-[600px] overflow-hidden rounded-2xl">
          <Image
            src="/placeholder.jpg"
            layout="fill"
            objectFit="contain"
            alt="No hay imágenes disponibles"
          />
        </div>
      )}
    </div>
  );
};

export default PhotoSlider;
