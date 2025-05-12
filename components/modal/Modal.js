import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Modal = ({ onClose }) => {
    const [progress, setProgress] = useState(0);
    const [currentPart, setCurrentPart] = useState(1);
    const [error, setError] = useState('');

    // Estados para los campos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        accion: '',
        localidad: '',
        tipo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(''); // Limpiar error al escribir
    };

    useEffect(() => {
        const body = document.querySelector('body');
        if (currentPart !== 0 && currentPart <= 4) { // Solo bloquear scroll si el modal está activo y no en el paso final
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
        return () => {
            body.style.overflow = 'auto';
        };
    }, [currentPart]);

    const mostrarError = (mensaje) => {
        setError(mensaje);
        setTimeout(() => {
            setError('');
        }, 3000); // Aumentado a 3 segundos
    };

    const handleNextPart = (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        if (currentPart === 1) {
            const { nombre, apellido, telefono, email } = formData;
            if (!nombre || !apellido || !telefono || !email) {
                mostrarError('Todos los campos personales son obligatorios.');
                return;
            }
            // Validación simple de email (puedes mejorarla)
            if (!/\S+@\S+\.\S+/.test(email)) {
                mostrarError('Por favor, ingresa un email válido.');
                return;
            }
            setProgress(25);
            setCurrentPart(2);
        } else if (currentPart === 2) {
            if (!formData.accion) {
                mostrarError('Selecciona qué desea realizar.');
                return;
            }
            setProgress(50);
            setCurrentPart(3);
        } else if (currentPart === 3) {
            if (!formData.localidad) {
                mostrarError('Ingresa la localidad o barrio.');
                return;
            }
            setProgress(75);
            setCurrentPart(4);
        } else if (currentPart === 4) {
            if (!formData.tipo) {
                mostrarError('Selecciona el tipo de vivienda.');
                return;
            }
            // Aquí es donde el formulario se enviaría realmente si no fuera el último paso visual
            // Como es el último paso antes del agradecimiento, simulamos el envío y avanzamos.
            setProgress(100);
            setCurrentPart(5); // Mostrar mensaje de agradecimiento
            // Aquí podrías llamar a la función que realmente envía el formulario
            // document.getElementById('tasacionForm').submit(); // Descomentar si quieres enviar el form nativamente
        }
    };

    const handleFormSubmit = (e) => {
        // Previene el submit default solo si no es el último paso
        // En el último paso, queremos que el form se envíe.
        // Sin embargo, con FormSubmit.co, el avance a currentPart 5 es visual y
        // el envío real lo maneja FormSubmit al hacer clic en el botón type="submit".
        // Por lo tanto, handleNextPart se encarga de la lógica de avance.
        // Si currentPart === 4, y todo es válido, handleNextPart llamará a setCurrentPart(5)
        // y el botón será "Enviar".
        if (currentPart < 4) {
            e.preventDefault(); // Prevenir envío si no es el último paso de validación
            handleNextPart(e);
        } else if (currentPart === 4) {
             // Validaciones finales antes de permitir el envío
            if (!formData.tipo) {
                e.preventDefault(); // Prevenir si el último campo no es válido
                mostrarError('Selecciona el tipo de vivienda.');
                return;
            }
            // Si todo es válido, se actualiza el progreso y se muestra la parte 5
            // El envío real lo hace el form action de HTML
            setProgress(100);
            setCurrentPart(5);
            // No es necesario e.preventDefault() aquí si quieres que FormSubmit.co actúe
            // El setCurrentPart(5) te mostrará el mensaje de agradecimiento
            // mientras FormSubmit.co procesa el envío en segundo plano.
        }
    };


    // Contenido para cada parte del formulario
    const renderFormPart = () => {
        switch (currentPart) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Ingresa tus datos personales:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
                                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu Nombre" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-100 focus:ring focus:ring-main-100 focus:ring-opacity-50 bg-gray-50 p-2.5" />
                            </div>
                            <div>
                                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido:</label>
                                <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Tu Apellido" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-100 focus:ring focus:ring-main-100 focus:ring-opacity-50 bg-gray-50 p-2.5" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono:</label>
                                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Ej: 1122334455" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-100 focus:ring focus:ring-main-100 focus:ring-opacity-50 bg-gray-50 p-2.5" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@correo.com" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-100 focus:ring focus:ring-main-100 focus:ring-opacity-50 bg-gray-50 p-2.5" />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">¿Qué desea realizar?</h3>
                        <div>
                            <label htmlFor="accion" className="sr-only">Acción</label>
                            <select id="accion" name="accion" value={formData.accion} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-100 focus:ring focus:ring-main-100 focus:ring-opacity-50 bg-gray-50 p-2.5">
                                <option value="">-- Seleccionar --</option>
                                <option value="venta">Venta</option>
                                <option value="compra">Compra</option>
                                <option value="alquiler">Alquiler</option>
                            </select>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Escribe tu localidad o barrio:</h3>
                        <div>
                            <label htmlFor="localidad" className="sr-only">Localidad</label>
                            <input type="text" id="localidad" name="localidad" value={formData.localidad} onChange={handleChange} placeholder="Ej: Palermo, Buenos Aires" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-100 focus:ring focus:ring-main-100 focus:ring-opacity-50 bg-gray-50 p-2.5" />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">¿Qué tipo de vivienda es?</h3>
                        <div>
                            <label htmlFor="tipo" className="sr-only">Tipo de Vivienda</label>
                            <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-main-100 focus:ring focus:ring-main-100 focus:ring-opacity-50 bg-gray-50 p-2.5">
                                <option value="">-- Seleccionar tipo --</option>
                                <option value="casa">Casa</option>
                                <option value="departamento">Departamento</option>
                                <option value="galpon">Galpón</option>
                                <option value="ph">PH</option>
                                <option value="local">Local</option>
                                <option value="terreno">Terreno/Lote</option>
                                <option value="industria">Industria</option>
                                <option value="campo">Campo</option>
                            </select>
                        </div>
                    </div>
                );
            case 5: // Mensaje de agradecimiento
                return (
                    <div className="text-center py-8">
                        <svg className="w-16 h-16 text-main-100 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">¡Muchas gracias!</h3>
                        <p className="text-gray-600 mb-6">Tu solicitud ha sido enviada. En breve nos comunicaremos contigo.</p>
                        <div className="w-48 h-auto mx-auto opacity-80">
                             <Image
                                src='/assets/logo-titulo1.png' // Asegúrate que la ruta es correcta
                                alt="Logo Inmobiliaria"
                                width={200} // Ajusta según el tamaño real de tu logo
                                height={100} // Ajusta para mantener la proporción
                                objectFit="contain"
                            />
                        </div>
                        <button
                            onClick={() => {
                                setCurrentPart(0); // Para resetear o permitir cerrar
                                onClose(); // Cierra el modal
                            }}
                            className="mt-8 bg-main-100 hover:bg-main-200 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                        >
                            Cerrar
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 overflow-y-auto">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { if(currentPart !== 5) onClose(); }}></div>

            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modalEnter">
                {currentPart <= 4 && (
                  <>
                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-main-200">Solicitud de Tasación</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Barra de Progreso */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                        <div
                            className="bg-main-100 h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                  </>
                )}


                {/* Contenedor del Error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm animate-fadeIn">
                        {error}
                    </div>
                )}

                {/* Si currentPart es 5, solo muestra el mensaje de agradecimiento, sino el form */}
                {currentPart === 5 ? (
                    renderFormPart()
                ) : (
                    <form
                        id="tasacionForm"
                        action="https://formsubmit.co/inmobiliaria.lbobadilla@gmail.com"
                        method="POST" // Siempre POST para FormSubmit
                        onSubmit={handleFormSubmit}
                        className="space-y-6"
                    >
                        {/* Inputs ocultos para FormSubmit */}
                        <input type="hidden" name="_next" value="https://www.marialaurabobadilla.com.ar/" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_subject" value={`Nueva Solicitud de Tasación - ${formData.nombre} ${formData.apellido}`} />
                        {/* Campo para reply to, útil para FormSubmit */}
                        <input type="hidden" name="_replyto" value={formData.email} />


                        {renderFormPart()}

                        {/* Botones de Navegación / Envío */}
                        {currentPart <= 4 && (
                            <div className="flex justify-end pt-4">
                                <button
                                    type={currentPart === 4 ? "submit" : "button"}
                                    onClick={currentPart < 4 ? handleNextPart : undefined} // onClick solo para "Siguiente"
                                    className="bg-main-100 hover:bg-main-200 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-main-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
                                >
                                    {currentPart === 4 ? 'Enviar Solicitud' : 'Siguiente'}
                                </button>
                            </div>
                        )}
                    </form>
                )}
            </div>
            {/* Para la animación de entrada del modal */}
            <style jsx global>{`
                @keyframes modalEnter {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-modalEnter { animation: modalEnter 0.3s ease-out forwards; }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default Modal;