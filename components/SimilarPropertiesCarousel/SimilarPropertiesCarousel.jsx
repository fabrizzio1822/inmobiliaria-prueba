'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropertyCard from '@/components/PropertyCard/PropertyCard';

const SimilarPropertiesCarousel = ({ properties }) => {
  if (!properties || properties.length === 0) return null;

  return (
    <div className="w-full mt-16 pt-12 border-t border-gray-100">
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Propiedades Similares</h2>
        
        {/* Custom Navigation Buttons */}
        <div className="flex gap-3">
          <button className="custom-prev flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-main-100 hover:text-white transition-colors duration-200">
            <FiChevronLeft size={20} />
          </button>
          <button className="custom-next flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-main-100 hover:text-white transition-colors duration-200">
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        modules={[Navigation]}
        className="pb-4"
      >
        {properties.map((property) => (
          <SwiperSlide key={property.id} className="h-auto">
            {/* Wrapper div to make PropertyCard fill height properly if needed */}
            <div className="h-full py-2">
              <PropertyCard property={property} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};

export default SimilarPropertiesCarousel;
