'use client'
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/Header";
import Formulario from "@/components/formulario/Formulario";

import {Phone, Envelope, Location} from 'akar-icons'
import Footer from "@/components/Footer/Footer";
export default function Contactame(){
    return (
        <SessionProvider>
            <section class="informacion mt-8">
					<div className="mt-6 md:mt-2">
                    <Phone className="color-bordo" strokeWidth={2} size={50} />
						<p>299 - 154 213 223</p>
					</div>
					<div className="mt-6 md:mt-2">
                    <Envelope className="color-bordo" strokeWidth={2} size={50} />
						<p>marialaurabobadilla@outlook.com</p>
					</div>
					<div className="mt-6 md:mt-2">
                    <Location className="color-bordo" strokeWidth={2} size={50} />
						<p>Neuquén</p>
					</div>
				</section>
            <Formulario/>
            <Footer/>   
        </SessionProvider>
    )
}