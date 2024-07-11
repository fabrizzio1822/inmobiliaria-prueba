import { TriangleAlert , CircleAlert, Heart} from 'akar-icons';
import React from 'react';

export default function AdminDashboardInicio() {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="space-y-6">
                    {/* Mensaje de atención rojo */}
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                        <p className="font-bold flex gap-2"> <TriangleAlert strokeWidth={2} size={25} /> Asegúrate de que categoría y ubicación estén cargadas, porque sino no se verá la vivienda en el apartado Viviendas.</p>
                        <p>¿Cómo me aseguro de que esten cargadas?</p>
                        <p>Vas a categorías y te aseguras en el lista de categorías estén las que creaste</p>
                        <p>Para las ubicaciones es lo mismo que para categorías</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Paso 1: Crear Categoría</h2>
                        <p>Ejemplo: Departamento, Casa, Galpón, etc.</p>
                        <p>La categoría creada puede ser eliminada y actualizada haciendo clic en ella.</p>
                        <p>También hay una tercera opción que es para limpiar, lo que sirve para que se quite la categoría seleccionada.</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Paso 2: Crear ubicaciones para cada Categoría</h2>
                        <p>Al igual que la categoría, tiene 3 botones cuando se elige la ubicación seleccionada.</p>
                        <p>Es importante porque sirve para la búsqueda (que sean distintos entre ubicaciones)</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Paso 3: Agregar la Vivienda</h2>
                        <p>Ponerle título (que sean distintos entre viviendas).</p>
                        <p>Añadir descripción y rellenar todos los demás campos.</p>
                        <p>Al momento de añadir una imagen, lo recomendable es que siempre sean más de 2, pero menos de 10.</p>
                        <p>Cuando creas una vivienda, esta aparecerá automáticamente en la página de asesoramiento y también en Viviendas.</p>
                        <p>En Viviendas están todas las viviendas creadas, pero cuando se les hace clic a una de ellas, tienes la opción de editarla, borrarla y también de limpiar para que se quite la opción seleccionada.</p>
                        <p className='flex mt-4 gap-2'><CircleAlert strokeWidth={2} size={25} />Dato: Si pones 0 en el apartado precio, este no se verá. Esto es para las viviendas las cuales todavía no tienen precio. </p>
                    </div>
                    {/* Mensaje de agradecimiento verde */}
                    <div className="bg-green-50 p-4 gap-2 rounded-lg shadow-md text-center mt-6 flex">
                        <Heart strokeWidth={2} size={25} />
                        <h2 className="text-xl font-bold mb-2">Gracias por confiar en mí para el desarrollo de la web. Saludos</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}