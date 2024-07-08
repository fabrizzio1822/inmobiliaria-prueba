'use client'
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header";
import Servicios from "@/components/Servicios/Servicios";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <SessionProvider>
    <div>
      <Header/>
      <Banner/>
      <Servicios/>
      <Footer/> 
    </div>
    </SessionProvider>
  );
}
