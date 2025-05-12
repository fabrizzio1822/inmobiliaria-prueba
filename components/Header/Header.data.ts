import { HeaderData } from "./Header.types";

export const dataHeader: HeaderData[] = [
  { 
    id: 1,  
    name: 'Servicios Inmobiliarios', 
    link: '', 
    submenu: [
        { id: 1, name: 'Asesoramiento para Compra y Venta', link: '/servicios-inmobiliarios/asesoramiento' },
        { id: 2, name: 'Evaluación de Proyectos', link: '/servicios-inmobiliarios/evaluacion' }
    ] 
},
  {
    id: 2,
    name: "Otros Servicios",
    link: "",
    submenu: [
      { id: 1, name: 'Tasaciones', link: '/tasaciones' },
      { id: 2, name: 'Peritajes', link: '/peritajes' }
  ] 
  },
  {
    id: 3,
    name: "Propiedades",
    link: "/propiedad",
  },
  {
    id: 4,
    name: "Alquileres",
    link: "/alquileres", 
  },
];
