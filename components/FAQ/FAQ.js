'use client';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: "¿Cómo es el proceso de asesoramiento para comprar o vender?",
    answer: "Te acompaño en cada etapa del proceso, desde la búsqueda o publicación del inmueble hasta la firma de la escritura. Mi objetivo es que tomes decisiones seguras e informadas, respaldadas por mi experiencia como Martillera y Corredora Pública."
  },
  {
    question: "¿En qué consiste la evaluación de proyectos inmobiliarios?",
    answer: "Analizamos la viabilidad técnica, financiera y comercial de tu proyecto. Gracias a mi experiencia financiera y visión de negocios, te ayudo a identificar oportunidades y maximizar la rentabilidad de tu inversión."
  },
  {
    question: "¿Qué diferencia hay entre una tasación y un peritaje?",
    answer: "La tasación determina el valor real y actual de mercado de una propiedad para su correcta comercialización. El peritaje es un informe técnico, exhaustivo y documentado, que suele utilizarse para resolver disputas legales, sucesiones o clarificar el estado dominial de un inmueble."
  },
  {
    question: "¿Cómo aplica el Coaching Ejecutivo en las negociaciones?",
    answer: "Al ser Coach Ejecutiva certificada por ICF, integro herramientas avanzadas de negociación, escucha activa y resolución de conflictos. Esto permite que transacciones que a veces son tensas o complejas se desarrollen de manera asertiva, fluida y exitosa para ambas partes."
  },
  {
    question: "¿Qué tipos de propiedades manejan?",
    answer: "Trabajamos con una amplia y exclusiva cartera que incluye casas, departamentos, terrenos, dúplex y desarrollos inmobiliarios, tanto para venta como para alquileres."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Título - Lado izquierdo */}
          <div className="lg:w-1/3 flex-shrink-0">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2B5E] leading-tight font-sans">
              Preguntas <br className="hidden lg:block"/>frecuentes
            </h2>
          </div>

          {/* Acordeón - Lado derecho */}
          <div className="lg:w-2/3 flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="rounded-xl overflow-hidden bg-[#F8F9FA] transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-semibold text-[#2A2B5E] text-base md:text-lg pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      <FiChevronDown 
                        className={`w-5 h-5 text-[#2A2B5E] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                      />
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 pt-0 text-gray-600 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
