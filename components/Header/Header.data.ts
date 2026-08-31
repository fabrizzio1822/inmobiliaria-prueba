import { HeaderData } from "./Header.types";

export const dataHeader: HeaderData[] = [
  { 
    id: 1,  
    name: 'Servicios Inmobiliarios', 
    link: '', 
    submenu: [
        { 
          id: 1, 
          name: 'Asesoramiento para Compra y Venta', 
          link: '/servicios-inmobiliarios/asesoramiento',
          description: 'Acompañamiento experto en cada etapa de tu operación.',
          iconName: 'asesoramiento'
        },
        { 
          id: 2, 
          name: 'Evaluación de Proyectos', 
          link: '/servicios-inmobiliarios/evaluacion',
          description: 'Análisis de viabilidad y rentabilidad para desarrollos.',
          iconName: 'evaluacion'
        }
    ] 
},
  {
    id: 2,
    name: "Otros Servicios",
    link: "",
    submenu: [
      { 
        id: 1, 
        name: 'Tasaciones', 
        link: '/tasaciones',
        description: 'Conocé el valor real y actual de tu propiedad en el mercado.',
        iconName: 'tasacion'
      },
      { 
        id: 2, 
        name: 'Peritajes', 
        link: '/peritajes',
        description: 'Informes técnicos y peritajes para cuestiones legales o disputas.',
        iconName: 'peritaje'
      }
  ] 
  },
  {
    id: 3,
    name: "Propiedades",
    link: "",
    submenu: [
      { 
        id: 1, 
        name: 'Venta', 
        link: '/ventas',
        description: 'Encontrá tu próximo hogar o inversión.',
        iconName: 'asesoramiento'
      },
      { 
        id: 2, 
        name: 'Alquiler', 
        link: '/alquileres',
        description: 'Propiedades disponibles para alquilar.',
        iconName: 'evaluacion'
      },
      { 
        id: 3, 
        name: 'Ver todas', 
        link: '/propiedad',
        description: 'Explorá todo nuestro catálogo de propiedades.',
        iconName: 'tasacion'
      }
    ]
  }
];
