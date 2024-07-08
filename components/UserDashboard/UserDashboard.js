
import Lottie from "lottie-react";
import  userDasboard  from "./userDashboard.json";

export function UserDasboard() {
    return (
        <div className=" min-h-screen">
                        {/* Bienvenida y Agradecimiento */}
                        <div className=" p-8 rounded-lg max-w-md mx-auto mt-8 text-center">
                            <h1 className="text-3xl font-bold mb-4 text-gray-800">Bienvenido a tu Dashboard</h1>
                            <p className="text-gray-600">Gracias por confiar en nosotros.</p>
                        </div>

                        {/* Servicios */}
                        <div className="max-w-4xl mx-auto mt-8 p-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestros Servicios</h2>
                            <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                                <p className="text-gray-700 mb-4">
                                    Ofrecemos una amplia gama de servicios para satisfacer tus necesidades inmobiliarias:
                                </p>
                                <ul className="list-disc list-inside">
                                    <li>Asesoramiento en compra y venta de propiedades.</li>
                                    <li>Peritajes técnicos especializados.</li>
                                    <li>Tasaciones precisas y detalladas.</li>
                                    <li>Evaluación de proyectos inmobiliarios.</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center justify-center mt-12 text-center px-5">
                                <h2 className="text-3xl mb-5 font-bold"> Todavía estamos trabajando en esto. Pronto podrás ver los resultados!</h2>
                                <Lottie loop={true} animationData={userDasboard} style={{width: '50%'}} />
                            </div>
                            
                        </div>
                        
                    </div>
        
    )
}