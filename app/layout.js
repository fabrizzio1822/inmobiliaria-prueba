'use client'
import { Quicksand } from "next/font/google";
import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { CategoryProvider } from "@/context/category";
import { TagProvider } from "@/context/tag";
import { ProductProvider } from "@/context/product";
const quickSand = Quicksand({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <SessionProvider>
      <CategoryProvider>
        <TagProvider>
        <ProductProvider>
      <body className={quickSand.className}>
        <Header/>
        <Toaster/>
        {children}
        
        </body>
        </ProductProvider>
        </TagProvider>
      </CategoryProvider>
    </SessionProvider>
    </html>
  );
}
