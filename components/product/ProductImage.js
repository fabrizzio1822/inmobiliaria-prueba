'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductImage({ property }) {
  const showImage = (src, title) => (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <Image
        src={src}
        layout="fill"
        objectFit="contain" // "cover" para que ocupe todo el espacio manteniendo la relación de aspecto
        alt={title}
      />
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {property?.photos?.length > 0 ? (
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
          }}
          className='w-full h-[600px]' // Mantener la altura fija para todas las imágenes
        >
          {product.images.map((image) => (
            <SwiperSlide key={image.public_id} className="flex justify-center items-center">
              {showImage(image.secure_url, product.title)}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="relative w-full h-[600px] overflow-hidden rounded-2xl">
          <Image
            src='/images/default.jpg'
            layout="fill"
            objectFit="contain" // "cover" para que ocupe todo el espacio manteniendo la relación de aspecto
            alt="Default Image"
          />
        </div>
      )}
    </div>
  );
}
