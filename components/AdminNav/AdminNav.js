import React from 'react';
import AdminTag from '../AdminPages/AdminTag/AdminTag';
import AdminProduct from '../AdminPages/AdminProduct/AdminProduct';
import AdminProducts from '../AdminPages/AdminProducts/AdminProducts';
import AdminCategory from '../AdminPages/AdminCategory/AdminCategory';
import AdminDashboardInicio from '../AdminDasboard/AdminDashboardInicio';
export default function AdminNav() {
    const [selectedComponent, setSelectedComponent] = React.useState(<AdminDashboardInicio/>);
    const showComponent = (component) => {
        setSelectedComponent(component);
    };
    return (
        <nav className='justify-center mb-3'>
            <button
                onClick={() => showComponent(<AdminDashboardInicio/>)}
                className='text-black hover:text-blue-700 px-4 py-2 rounded-md mx-2'
            >
                Inicio
            </button>
            <button
                onClick={() => showComponent(<AdminCategory />)}
                className='text-black hover:text-blue-700 px-4 py-2 rounded-md mx-2'
            >
                Categorias
            </button>
            <button
                onClick={() => showComponent(<AdminTag />)}
                className='text-black hover:text-blue-700 px-4 py-2 rounded-md mx-2'
            >
                Tags
            </button>
            <button
                onClick={() => showComponent(<AdminProduct />)}
                className='text-black hover:text-blue-700 px-4 py-2 rounded-md mx-2'
            >
                Agregar Vivienda
            </button>
            <button
                onClick={() => showComponent(<AdminProducts />)}
                className='text-black hover:text-blue-700 px-4 py-2 rounded-md mx-2'
            >
                Viviendas
            </button>
            <div className='mt-4'>
                {selectedComponent}
            </div>
        </nav>
    );
}