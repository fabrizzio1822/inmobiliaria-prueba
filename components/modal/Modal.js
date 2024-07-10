import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Modal = ({ onClose }) => {
    const [progress, setProgress] = useState(0);
    const [currentPart, setCurrentPart] = useState(1);

    useEffect(() => {
        const body = document.querySelector('body');
        if (currentPart !== 0) {
            body.style.overflow = 'hidden'; // Bloquear scroll cuando el modal está abierto
        } else {
            body.style.overflow = 'auto'; // Restaurar scroll cuando el modal se cierra
        }

        return () => {
            body.style.overflow = 'auto'; // Asegurarse de restaurar scroll al desmontar el modal
        };
    }, [currentPart]);

    const handleNextPart = (e) => {
        e.preventDefault();
        if (currentPart === 1) {
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            if (nombre === "" || apellido === "" || telefono === "" || email === "") {
                mostrarError('Todos los campos son obligatorios');
                return;
            }
            setProgress(25);
            setCurrentPart(2);
        } else if (currentPart === 2) {
            const accion = document.querySelector('select[name="accion"]').value;
            if (accion === "") {
                mostrarError('Selecciona una opción');
                return;
            }
            setProgress(50);
            setCurrentPart(3);
        } else if (currentPart === 3) {
            const localidad = document.getElementById('localidad').value;
            if (localidad === "") {
                mostrarError('Ingresa la localidad o barrio');
                return;
            }
            setProgress(75);
            setCurrentPart(4);
        } else if (currentPart === 4) {
            const tipo = document.querySelector('select[name="tipo"]').value;
            if (tipo === "") {
                mostrarError('Selecciona una opción');
                return;
            }
            setProgress(100);
            setCurrentPart(5);
        }
    };

    const mostrarError = (mensaje) => {
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('error-tasacion');
        document.getElementById('formulario').appendChild(error);

        setTimeout(() => {
            error.remove();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-auto">
            <div className="modal-background fixed inset-0 bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white absolute rounded-lg shadow-lg p-3 mx-auto max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="sm:text-2xl font-bold">Solicitud de Tasación</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
                </div>
               
                <form 
                    id="formulario" 
                    className="form-tasacion" 
                    action="https://formsubmit.co/inmobiliaria.lbobadilla@gmail.com" 
                    method="post"
                >
                    
                    
                        <div>
                            <h3>Ingresa tus datos:</h3>
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" placeholder="Nombre" required /><br /><br />
                            <label htmlFor="apellido">Apellido:</label>
                            <input type="text" id="apellido" name="apellido" placeholder="Apellido" required /><br /><br />
                            <label htmlFor="telefono">Teléfono:</label>
                            <input type="tel" id="telefono" name="telefono" placeholder="Teléfono" required /><br /><br />
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Email" required /><br /><br />
                            
                        </div>
                   
                        <hr/>
                    
                    
                        <div>
                            <h3 className=''>¿Qué desea realizar?</h3>
                            <select name="accion" required>
                                <option value="">Seleccionar</option>
                                <option value="venta">Venta</option>
                                <option value="compra">Compra</option>
                                <option value="alquiler">Alquiler</option>
                            </select><br /><br />
                            
                        </div>
                    

                    
                    
                        <div>
                            <h3>Escribe tu localidad o barrio:</h3>
                            <input type="text" name="localidad" id="localidad" placeholder="Escribe la localidad o barrio" required /><br /><br />
                            
                        </div>
                    

                   
                    
                        <div>
                            <h3>¿Qué tipo de vivienda es?</h3>
                            <select name="tipo" required>
                                <option value="">Seleccionar tipo de vivienda</option>
                                <option value="casa">Casa</option>
                                <option value="departamento">Departamento</option>
                                <option value="galpon">Galpón</option>
                                <option value="ph">PH</option>
                                <option value="local">Local</option>
                                <option value="terreno">Terreno/Lote</option>
                                <option value="industria">Industria</option>
                                <option value="campo">Campo</option>
                            </select><br /><br />

                        </div>
                            <input type="hidden" name="_next" value="https://www.marialaurabobadilla.com.ar/"/>
                            <input type="hidden" name="_captcha" value="false"/>
                            <input type="hidden" name="_subject" value="Inmobiliaria Bobadilla"/>
                            <button type="submit" className="bg-secondary px-4 py-2 text-white rounded-lg text-sm">Enviar</button>
                            </form> 

                    
                    {currentPart === 5 && (
                        <div className="parte-cinco">
                            <div>
                                <h3>¡Muchas gracias!</h3>
                                <p>El mensaje ya fue enviado a la experta, en breve se estará comunicando con usted</p>
                                <Image 
                                    src='/assets/logo-titulo1.png'
                                    width={400}
                                    height={400}
                                    className='pt-20'
                                />
                            </div>

                        </div>
                    )}
                    
            </div>
        </div>
    );
};

export default Modal;
