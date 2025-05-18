// Definición del objeto de servicios
const services = [
  {
    title: "Asesoramiento en compra y venta",
    description: "Ofrecemos asesoramiento experto en la compra y venta de propiedades, ayudándote a tomar las mejores decisiones.",
    link: "/servicios-inmobiliarios/asesoramiento",
    img: "/assets/planos.jpg",
    linktext: 'Ver más de Asesoramiento'
  },
  {
    title: "Evaluación de proyectos",
    description: "Realizamos evaluaciones detalladas de proyectos inmobiliarios para asegurar su viabilidad y rentabilidad.",
    link: "/servicios-inmobiliarios/evaluacion",
    img: "/assets/evaluacion-proyectos.jpg",
    linktext: 'Ver más de Evaluación'
  },
  {
    title: "Tasaciones",
    description: "Proveemos servicios de tasación precisos para determinar el valor real de las propiedades.",
    link: "/tasaciones",
    img: "/assets/tasacion.jpg",
    linktext: 'Ver más de Tasaciones'
  },
  {
    title: "Peritajes",
    description: "Ofrecemos servicios de peritaje para resolver disputas y brindar claridad sobre el estado de las propiedades.",
    link: "/peritajes",
    img: "/assets/papeles.jpg",
    linktext: 'Ver más de Peritajes'
  }
];

// Componente SliderServices
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

const SliderServices = () => {
    return (
        <Swiper
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
                slidesPerView: 2,
                spaceBetween: 15,
              },
            }}
            freeMode={true}
            pagination={{
              clickable: true
            }}
            modules={[Pagination]}
            className='h-[280px] md:h-[400px] w-[300px]  md:w-[500px] pb-6'
        >
            {services.map((service, index) => (
                <SwiperSlide key={index} className="service-slide my-0">
                    <div className="p-4 border rounded shadow-sm h-full flex flex-col">
                        <div className="relative w-full h-48 md:h-64 lg:h-80">
                            <Image 
                                src={service.img} 
                                alt={service.title} 
                                layout="fill" 
                                objectFit="cover"
                                className="rounded mb-4"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                        <p className="text-sm mb-4 flex-grow ">{service.description}</p>
                        <a href={service.link} className="text-main-100 font-bold underline mt-auto mb-4">{service.linktext}</a>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SliderServices;
