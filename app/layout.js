
import { Playfair_Display, Montserrat } from "next/font/google";
import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { Header } from "@/components/Header/Header";
import NavbarFixed from "@/components/Header/NavbarFixed";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});
export const metadata = {
  title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más allá',
  description:
    'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
  authors: [{ name: 'María Laura Bobadilla', url: 'https://www.marialaurabobadilla.com.ar' }],
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
  openGraph: {
    title: 'Inmobiliaria María Laura Bobadilla | Propiedades en Neuquén y más',
    description:
      'Encuentra tu hogar ideal con la Inmobiliaria de María Laura Bobadilla en Neuquén, Argentina. Ofrecemos compra, venta, alquiler de propiedades en diversas ubicaciones. Asesoramiento experto, tasaciones, evaluación de proyectos y peritajes inmobiliarios.',
    url: 'https://www.marialaurabobadilla.com.ar',
    siteName: 'Inmobiliaria María Laura Bobadilla',
    locale: 'es_AR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.marialaurabobadilla.com.ar',
    languages: {
      'es': 'https://www.marialaurabobadilla.com.ar',
      'es-AR': 'https://www.marialaurabobadilla.com.ar',
      'x-default': 'https://www.marialaurabobadilla.com.ar',
    }
  }
};
export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>
        <Header />
        <NavbarFixed />
        <Toaster />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>

    </html>
  );
}