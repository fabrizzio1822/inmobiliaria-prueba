import { 
  Building2, 
  Factory, 
  Landmark, 
  AlertTriangle, 
  LineChart, 
  ShieldCheck, 
  FileCheck,
  ClipboardList,
  Wrench,
  CheckCircle2,
  TrendingUp,
  PieChart,
  Target,
  RefreshCcw,
  Users,
  Search,
  BookOpen,
  Eye,
  Activity,
  Handshake,
  Key,
  MessageSquare,
  Home,
  Scale
} from "lucide-react";

export type ServiceData = {
  id: string;
  slug: string;
  titlePrefix: string;
  titleAccent: string;
  intro: string;
  image: string;
  secondaryImage?: string;
  quote?: { text: string };
  statistics?: { value: string; label: string }[];
  offeredServices: { title: string; icon: any }[];
  types?: { title: string; icon: any }[];
  methodology: { title: string; description: string }[];
  benefits: { title: string; icon: any }[];
  relatedServices: string[];
  whatsappMessage: string;
  hasModalForm?: boolean;
};

export const servicesData: Record<string, ServiceData> = {
  peritajes: {
    id: "peritajes",
    slug: "/peritajes",
    titlePrefix: "Servicio de",
    titleAccent: "Peritajes",
    intro: "El peritaje es crucial para garantizar la objetividad, precisión y confianza en la evaluación de activos. Contribuye a aclarar hechos complejos y facilita la comprensión técnica en el sistema judicial, resolviendo disputas y promoviendo la justicia.",
    image: "/assets/papeles.jpg",
    secondaryImage: "/assets/planos.jpg",
    quote: { text: "La objetividad y el rigor profesional son la clave fundamental para resolver cualquier disputa." },
    statistics: [
      { value: "300+", label: "Peritajes realizados" },
      { value: "100%", label: "Precisión y detalle" },
      { value: "15", label: "Años de experiencia" }
    ],
    offeredServices: [
      { title: "Peritajes inmobiliarios", icon: Building2 },
      { title: "Peritajes industriales", icon: Factory },
      { title: "Peritajes financieros", icon: Landmark },
    ],
    types: [
      { title: "Evaluación de daños", icon: AlertTriangle },
      { title: "Tasaciones de bienes inmuebles", icon: Home },
      { title: "Análisis de riesgos", icon: Activity },
      { title: "Auditorías técnicas", icon: ClipboardList },
    ],
    methodology: [
      { title: "Recolección de datos", description: "Recolección y análisis detallado de datos sobre el bien en cuestión." },
      { title: "Herramientas avanzadas", description: "Uso de herramientas y técnicas avanzadas de evaluación." },
      { title: "Informe detallado", description: "Entrega de un informe detallado y claro con conclusiones y recomendaciones." },
    ],
    benefits: [
      { title: "Informes precisos", icon: FileCheck },
      { title: "Asesoramiento confiable", icon: Users },
      { title: "Decisiones objetivas", icon: Scale },
      { title: "Reducción de riesgos", icon: ShieldCheck },
    ],
    relatedServices: ["tasaciones", "asesoramiento"],
    whatsappMessage: "Hola! Quería consultar sobre un servicio de peritaje inmobiliario.",
  },
  tasaciones: {
    id: "tasaciones",
    slug: "/tasaciones",
    titlePrefix: "Servicio de",
    titleAccent: "Tasaciones",
    intro: "Obtén evaluaciones precisas y confiables sobre el valor real de tus propiedades. Nuestros servicios de tasaciones son esenciales para tomar decisiones financieras o inmobiliarias seguras, obteniendo el mejor precio posible en el mercado.",
    image: "/assets/tasacion.jpg",
    secondaryImage: "/assets/evaluacion-proyectos.jpg",
    quote: { text: "Conocer el valor real es el primer gran paso hacia una operación inmobiliaria exitosa." },
    statistics: [
      { value: "500+", label: "Propiedades tasadas" },
      { value: "48hs", label: "Tiempo de entrega promedio" },
      { value: "98%", label: "Satisfacción de clientes" }
    ],
    offeredServices: [
      { title: "Tasaciones para venta", icon: TrendingUp },
      { title: "Tasaciones para alquiler", icon: Home },
      { title: "Peritajes judiciales", icon: BookOpen },
    ],
    methodology: [
      { title: "Inspección de la propiedad", description: "Visita y análisis exhaustivo del estado del inmueble." },
      { title: "Estudio de mercado", description: "Evaluación de precios comparativos y tendencias actuales en la zona." },
      { title: "Entrega de informe", description: "Presentación de la tasación oficial con fundamentos detallados." },
    ],
    benefits: [
      { title: "Rapidez en informes", icon: RefreshCcw },
      { title: "Experiencia en el mercado", icon: Target },
      { title: "Asesoramiento personalizado", icon: MessageSquare },
      { title: "Garantía de satisfacción", icon: CheckCircle2 },
    ],
    relatedServices: ["peritajes", "evaluacion"],
    whatsappMessage: "Hola! Quería solicitar una tasación para mi propiedad.",
    hasModalForm: true,
  },
  evaluacion: {
    id: "evaluacion",
    slug: "/servicios-inmobiliarios/evaluacion",
    titlePrefix: "Evaluación de",
    titleAccent: "Proyectos",
    intro: "Aseguramos decisiones fundamentadas mediante un análisis sistemático y objetivo de tus proyectos inmobiliarios. Identificamos oportunidades, evaluamos riesgos y medimos el impacto desde la concepción hasta la implementación.",
    image: "/assets/evaluacion-proyectos.jpg",
    secondaryImage: "/assets/tasacion.jpg",
    quote: { text: "Tomá decisiones seguras apoyadas en un análisis meticuloso del mercado y los riesgos reales." },
    statistics: [
      { value: "150+", label: "Proyectos analizados" },
      { value: "100%", label: "Enfoque en la rentabilidad" },
      { value: "0", label: "Márgenes de error tolerados" }
    ],
    offeredServices: [
      { title: "Análisis de viabilidad", icon: LineChart },
      { title: "Evaluación de costos y beneficios", icon: PieChart },
      { title: "Gestión y mitigación de riesgos", icon: ShieldCheck },
      { title: "Control del progreso", icon: Eye },
      { title: "Evaluación del impacto", icon: Target },
    ],
    methodology: [
      { title: "Análisis basado en datos", description: "Análisis profundo y detallado utilizando datos precisos del mercado." },
      { title: "Revisión constante", description: "Monitoreo continuo y ajuste dinámico de las estrategias aplicadas." },
      { title: "Colaboración estrecha", description: "Trabajo conjunto con todas las partes interesadas del proyecto." },
    ],
    benefits: [
      { title: "Optimización de recursos", icon: TrendingUp },
      { title: "Mayor certeza en decisiones", icon: CheckCircle2 },
      { title: "Mitigación de riesgos", icon: ShieldCheck },
      { title: "Resultados medibles", icon: LineChart },
    ],
    relatedServices: ["asesoramiento", "tasaciones"],
    whatsappMessage: "Hola! Quería consultar sobre el servicio de evaluación de proyectos.",
  },
  asesoramiento: {
    id: "asesoramiento",
    slug: "/servicios-inmobiliarios/asesoramiento",
    titlePrefix: "Asesoramiento",
    titleAccent: "Integral",
    intro: "Brindamos orientación especializada a clientes que buscan realizar transacciones inmobiliarias. Abarcamos desde la identificación de grandes oportunidades de compra o alquiler hasta la gestión impecable de cierres exitosos.",
    image: "/assets/planos.jpg",
    secondaryImage: "/assets/papeles.jpg",
    quote: { text: "Te acompañamos en cada paso legal y comercial para que tu inversión sea siempre la mejor." },
    statistics: [
      { value: "1k+", label: "Familias asesoradas" },
      { value: "100%", label: "Acompañamiento legal" },
      { value: "24/7", label: "Disponibilidad de consultas" }
    ],
    offeredServices: [
      { title: "Búsqueda de propiedades", icon: Search },
      { title: "Negociación de contratos", icon: Handshake },
      { title: "Gestión de cierres", icon: Key },
    ],
    methodology: [
      { title: "Entrevista inicial", description: "Comprendemos tus necesidades, presupuesto y objetivos a fondo." },
      { title: "Búsqueda y selección", description: "Filtramos y visitamos las mejores opciones del mercado para ti." },
      { title: "Cierre exitoso", description: "Te acompañamos en toda la negociación y firma de los contratos." },
    ],
    benefits: [
      { title: "Ahorro de tiempo", icon: RefreshCcw },
      { title: "Seguridad legal", icon: FileCheck },
      { title: "Mejores precios", icon: TrendingUp },
      { title: "Acompañamiento 100%", icon: Users },
    ],
    relatedServices: ["evaluacion", "tasaciones"],
    whatsappMessage: "Hola! Quería consultar sobre asesoramiento en compra y venta de propiedades.",
  }
};
