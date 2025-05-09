'use client'
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Formulario from "@/components/formulario/Formulario";
import { Header } from "@/components/Header";
import Propiedades from "@/components/PropiedadesTokko/PropiedadesTokko";
import Servicios from "@/components/Servicios/Servicios";
import { TransitionPage } from "@/components/TransitionPage";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <SessionProvider>
      <TransitionPage/>
    <main className="main">
      <Banner/>
      <div className="max-w-6xl mx-auto">
          <Servicios />
      </div>
      
      <Formulario/>
      <Footer/> 
    </main>
    </SessionProvider>
  );
}
