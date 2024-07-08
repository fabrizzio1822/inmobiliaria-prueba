import { Quicksand } from "next/font/google";
import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
const quickSand = Quicksand({ subsets: ['latin'] })

export const metadata = {
  title: "Inmobiliaria Bobadilla",
  description: "Inmobiliaria donde encontrás todo lo que buscás",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quickSand.className}>{children}</body>
    </html>
  );
}
