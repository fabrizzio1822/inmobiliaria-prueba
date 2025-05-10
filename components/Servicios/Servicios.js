import SliderServices from "../Slider/SliderServices";


export default function Servicios () {
    return (
        
        <div className="grid md:px-20 items-center justify-center lg:h-[800px] md:h-[1000px] p-4 max-w-6xl lg:gap-6 mx-auto lg:grid-cols-2 ">
            <div className="max-w-[450px]">
                <h1 className="text-2xl leading-tigth text-center md:text-left md:text-4xl lg:mb-5">
                    Mis {' '}
                    <span className="font-bold text-main-100">
                        Servicios
                    </span>
                </h1>
                <p className="mb-3 text-xl text-gray-700 py-4 md:p-1">
                Nos dedicamos a ofrecer servicios de alta calidad para satisfacer todas tus necesidades.
                 Desde el asesoramiento en la compra y venta de propiedades hasta la evaluación detallada de proyectos, nuestras soluciones
                  están diseñadas para proporcionarte la mejor experiencia en el mercado inmobiliario. Nuestro objetivo es ayudarte a tomar decisiones
                    informadas y seguras en cada transacción.
                </p>
            </div>
            <div>
                <SliderServices/>
            </div>
        </div>
        
    )
}