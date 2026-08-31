

import Formulario from "@/components/formulario/Formulario";
import { TransitionPage } from "@/components/TransitionPage";
import { Phone, Envelope, Location } from 'akar-icons';

export const metadata = {
  title: 'Contacto | Inmobiliaria María Laura Bobadilla',
  description: 'Comunícate con nosotros para consultas sobre propiedades, tasaciones o asesoramiento en Neuquén.',
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar/contactame',
  }
};

export default function Contactame() {
  return (
    <div className=" pt-10">
		<TransitionPage/>
      <section className=" px-4 container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="flex flex-col items-center">
          <Phone className="text-main-100" strokeWidth={2} size={50} />
          <p className="mt-2 text-center">299 - 154 213 223</p>
        </div>
        <div className="flex flex-col items-center">
          <Envelope className="text-main-100" strokeWidth={2} size={50} />
          <p className="mt-2 text-center">marialaurabobadilla@outlook.com</p>
        </div>
        <div className="flex flex-col items-center">
          <Location className="text-main-100" strokeWidth={2} size={50} />
          <p className="mt-2 text-center">Neuquén</p>
        </div>
      </section>
      <div className="mt-12">
        <Formulario />
      </div>
    </div>
  );
}