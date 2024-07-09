import Link from "next/link";
import cuatrocerocuatro from './cuatrocerocuatro.json'
import Lottie from "lottie-react";
export default function Error404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-5">
            <h1 className="text-5xl font-semibold mb-6">Error 404</h1>
            <h2 className="text-3xl mb-5">¡UPS! No se encontró la vivienda que buscas</h2>
            <Lottie loop={true} animationData={cuatrocerocuatro} style={{width: '22%'}} />
            <div className="text-center mt-5">
                <Link href='/' className="px-3 py-2 bg-secondary text-white rounded-lg"> Volver a la Página Principal</Link>
            </div>
        </div>
    )
}
