'use client'
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Formulario from "@/components/formulario/Formulario";
import { Header } from "@/components/Header";
import Servicios from "@/components/Servicios/Servicios";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <SessionProvider>
    <div>
      <Banner/>
      <Servicios/>
      <Formulario/>
      <Footer/> 
      
    </div>
    </SessionProvider>
  );
}
