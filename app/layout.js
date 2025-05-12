
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
    'inmobiliaria Argentina',
    'propiedades Argentina',
    'bienes raíces Argentina',
    'venta de propiedades Argentina',
    'alquiler de propiedades Argentina',
    'tasaciones Argentina',
    'asesoramiento inmobiliario Argentina',
    'evaluación de proyectos ',
    'peritajes ',
    'agente inmobiliario Argentina',
    'propiedades Villa La Angostura',
    'propiedades Puerto Manzano',
 
  ],
  authors: [{ name: 'María Laura Bobadilla', url: 'www.marialaurabobadilla.com.ar' }], 
  creator: 'María Laura Bobadilla', 
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
    title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más',
    description:
      'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
    url: 'www.marialaurabobadilla.com.ar',
    siteName: 'Inmobiliaria María Laura Bobadilla',
    
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TuCuentaDeTwitter', // Opcional: tu cuenta de Twitter
    creator: '@TuCuentaDeTwitter', // Opcional: tu cuenta de Twitter
    title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más',
    description:
      'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
    
    alt: 'Logo de Inmobiliaria María Laura Bobadilla',
  },
  instagram: {
    card: 'summary_large_image',
    site: '@', // Opcional: tu cuenta de Instagram
    title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más',
    description:
      'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
   
    alt: 'Logo de Inmobiliaria María Laura Bobadilla',
  },
  alternates: {
    canonical: 'www.marialaurabobadilla.com.ar',
    languages: {
      'es-AR': 'www.marialaurabobadilla.com.ar',
    }

  },
 
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
