'use client'
import Banner from "@/components/Banner/Banner";
import Formulario from "@/components/formulario/Formulario";
import Servicios from "@/components/Servicios/Servicios";
import { TransitionPage } from "@/components/TransitionPage";
import { TokkoSearchProvider } from "@/context/SearchContext";

export default function Home() {
  return (
     <TokkoSearchProvider>
       <TransitionPage/>
    <main className="main">
      <Banner/>
      
      <div className="max-w-6xl mx-auto">
          <Servicios />
      </div>
      
        <Formulario/>
        
    </main>
     </TokkoSearchProvider>
  );
}