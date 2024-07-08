'use client'
import { Quicksand } from "next/font/google";
import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer/Footer";
const quickSand = Quicksand({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <SessionProvider>
    
      <body className={quickSand.className}>
        <Header/>
        <Toaster/>
        {children}
        
        </body>
    
    </SessionProvider>
    </html>
  );
}
