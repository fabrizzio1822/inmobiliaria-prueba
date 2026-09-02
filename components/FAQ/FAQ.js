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
    answer: "Analizo la viabilidad técnica, financiera y comercial de tu proyecto. Gracias a mi experiencia financiera y visión de negocios, te ayudo a identificar oportunidades y maximizar la rentabilidad de tu inversión."
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
    question: "¿Qué tipos de propiedades manejás?",
    answer: "Trabajo con una amplia y exclusiva cartera que incluye casas, departamentos, terrenos, dúplex y desarrollos inmobiliarios, tanto para venta como para alquileres."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-full py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Título - Lado izquierdo */}
          <div className="lg:w-1/3 flex flex-col flex-shrink-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight mb-6">
              Preguntas <br className="hidden lg:block" /><span className="text-main-100 italic">frecuentes</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Resuelvo tus dudas principales sobre mis servicios inmobiliarios y profesionales
            </p>
          </div>

          {/* Acordeón - Lado derecho */}
          <div className="lg:w-2/3 flex flex-col">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-gray-200 transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                  >
                    <span className="font-bold text-gray-900 text-lg md:text-xl pr-4 group-hover:text-main-100 transition-colors">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-main-100 border-main-100 text-white' : 'border-gray-300 text-gray-400 group-hover:border-main-100 group-hover:text-main-100'}`}>
                      <FiChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
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
