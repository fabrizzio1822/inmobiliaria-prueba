
import { Quicksand } from "next/font/google";
import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { Header } from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer/Footer";
const quickSand = Quicksand({ subsets: ['latin'] })

export const metadata = {
  title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más allá',
  description:
    'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
  keywords: [
    'inmobiliaria Neuquén',
    'propiedades Neuquén',
    'bienes raíces Neuquén',
    'venta de propiedades Neuquén',
    'alquiler de propiedades Neuquén',
    'tasaciones Neuquén',
    'asesoramiento inmobiliario Neuquén',
    'evaluación de proyectos inmobiliarios',
    'peritajes inmobiliarios',
    'María Laura Bobadilla inmobiliaria',
    'propiedades Argentina',
    'compra de propiedades',
    'venta de propiedades',
    'alquiler de propiedades',
    'inversión inmobiliaria',
    'asesoramiento compra venta propiedades',
    'agente inmobiliario Neuquén',
    // Agrega aquí ubicaciones específicas donde tengas propiedades (si son pocas y relevantes para SEO general)
    // Ejemplo: 'propiedades Villa La Angostura', 'inmobiliaria San Martín de los Andes',
  ],
  authors: [{ name: 'María Laura Bobadilla', url: 'URL de tu sitio web' }], // Opcional: si tienes una página de "acerca de"
  creator: 'Tu Nombre o Nombre de tu Empresa de Desarrollo Web', // Opcional
  publisher: 'Inmobiliaria María Laura Bobadilla',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': 'large',
    'max-image-preview': 'large',
    'max-snippet': 'large',
  },
  verification: {
    google: 'TU_GOOGLE_SITE_VERIFICATION_CODE', // Reemplaza con tu código de verificación de Google Search Console
    other: {
      'msvalidate.01': 'TU_BING_SITE_VERIFICATION_CODE', // Reemplaza con tu código de verificación de Bing Webmaster Tools
    },
  },
  openGraph: {
    title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más allá',
    description:
      'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
    url: 'URL de tu sitio web',
    siteName: 'Inmobiliaria María Laura Bobadilla',
    images: [
      {
        url: 'URL de la imagen principal de tu sitio web o logo', // Reemplaza con la URL de tu logo o una imagen representativa
        width: 1200,
        height: 630,
        alt: 'Logo de Inmobiliaria María Laura Bobadilla',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TuCuentaDeTwitter', // Opcional: tu cuenta de Twitter
    creator: '@TuCuentaDeTwitter', // Opcional: tu cuenta de Twitter
    title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más allá',
    description:
      'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
    image: 'URL de la imagen principal de tu sitio web o logo', // Reemplaza con la URL de tu logo o una imagen representativa
    alt: 'Logo de Inmobiliaria María Laura Bobadilla',
  },
  instagram: {
    card: 'summary_large_image',
    site: '@TuCuentaDeInstagram', // Opcional: tu cuenta de Instagram
    title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más allá',
    description:
      'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
    image: 'URL de la imagen principal de tu sitio web o logo', // Reemplaza con la URL de tu logo o una imagen representativa
    alt: 'Logo de Inmobiliaria María Laura Bobadilla',
  },
  alternates: {
    canonical: 'URL de tu sitio web',
    // languages: {
    //   'es-AR': 'URL de tu sitio web en español argentino',
    //   'en-US': 'URL de tu sitio web en inglés (si aplica)',
    // },
  },
  manifest: '/manifest.json', // Si tienes un archivo manifest para Progressive Web App
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <Header/>
        <Toaster/>
        {children}
        <Footer/>
        </body>
        
    </html>
  );
}
