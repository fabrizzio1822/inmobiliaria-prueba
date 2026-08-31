import React, { useState, useRef } from 'react';
import { dataHeader } from '../Header/Header.data';
import Link from 'next/link';
import { GrFormDown, GrFormUp } from 'react-icons/gr';
import { FiChevronRight, FiBriefcase, FiTrendingUp, FiTarget, FiFileText } from 'react-icons/fi';

// Mapeo simple de iconos según el iconName que pusimos en Header.data.ts
const getIcon = (iconName) => {
    switch (iconName) {
        case 'asesoramiento': return <FiBriefcase size={18} />;
        case 'evaluacion': return <FiTrendingUp size={18} />;
        case 'tasacion': return <FiTarget size={18} />;
        case 'peritaje': return <FiFileText size={18} />;
        default: return <FiBriefcase size={18} />;
    }
};

export function Navbar({ theme = 'dark' }) {
    const [submenuOpenId, setSubmenuOpenId] = useState(null);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const handleMouseEnter = (id) => {
        setSubmenuOpenId(id);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            if (dropdownRef.current && !dropdownRef.current.matches(':hover') &&
                buttonRef.current && !buttonRef.current.matches(':hover')) {
                setSubmenuOpenId(null);
            }
        }, 150);
    };

    const handleSubmenuMouseEnter = () => {
        clearTimeout();
    };

    const handleSubmenuMouseLeave = () => {
        setSubmenuOpenId(null);
    };

    return (
        <div className='lg:gap-6 xl:gap-8 border-white lg:flex lg:block hidden'>
            {dataHeader.map(({ id, name, link, submenu }) => (
                <div
                    key={id}
                    className="relative items-center group block flex hover:text-main-100 py-4"
                    onMouseEnter={() => submenu && handleMouseEnter(id)}
                    onMouseLeave={handleMouseLeave}
                    ref={submenu ? (el) => (buttonRef.current = el) : null}
                >
                    <Link href={link} className={`block font-medium transition-colors ${theme === 'light' ? 'text-white hover:text-gray-200' : 'text-gray-800 hover:text-main-100'}`}>
                        {name}
                    </Link>
                    {submenu && (
                        <div className={theme === 'light' ? 'text-white' : 'text-gray-800'}>
                            {submenuOpenId === id ? <GrFormUp className='ml-1 mt-0.5' /> : <GrFormDown className='ml-1 mt-0.5' />}
                        </div>
                    )}
                    
                    {/* Rich Dropdown Menu */}
                    {submenu && submenuOpenId === id && (
                        <div
                            ref={dropdownRef}
                            className="z-[9999] absolute top-[55px] left-0 w-[360px] p-2 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col gap-1 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
                            onMouseEnter={handleSubmenuMouseEnter}
                            onMouseLeave={handleSubmenuMouseLeave}
                        >
                            {submenu.map(subItem => (
                                <Link key={subItem.id} href={subItem.link} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200">
                                    {/* Contenedor del Icono */}
                                    <div className="flex-shrink-0 w-11 h-11 rounded-[10px] bg-gray-50 border border-gray-100 flex items-center justify-center text-main-100 group-hover:bg-white group-hover:shadow-sm group-hover:border-gray-200 transition-all">
                                        {getIcon(subItem.iconName)}
                                    </div>
                                    
                                    {/* Textos */}
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-sm font-semibold text-gray-900">{subItem.name}</span>
                                        {subItem.description && (
                                            <span className="text-xs text-gray-500 mt-0.5 leading-snug">{subItem.description}</span>
                                        )}
                                    </div>

                                    {/* Flecha derecha */}
                                    <div className="text-gray-300 group-hover:text-main-100 group-hover:translate-x-1 transition-all pr-1">
                                        <FiChevronRight size={18} strokeWidth={2.5} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}