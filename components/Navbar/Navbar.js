import React, { useState, useRef } from 'react';
import { dataHeader } from '../Header/Header.data';
import Link from 'next/link';
import { GrFormDown, GrFormUp } from 'react-icons/gr';

export function Navbar() {
    const [submenuOpenId, setSubmenuOpenId] = useState(null);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const handleMouseEnter = (id) => {
        setSubmenuOpenId(id);
    };

    const handleMouseLeave = () => {
        // Espera un breve momento para verificar si el mouse entró al submenu
        setTimeout(() => {
            if (dropdownRef.current && !dropdownRef.current.matches(':hover') &&
                buttonRef.current && !buttonRef.current.matches(':hover')) {
                setSubmenuOpenId(null);
            }
        }, 150); // Ajusta este tiempo si es necesario
    };

    const handleSubmenuMouseEnter = () => {
        // Evita que el timeout cierre el menú si el mouse entró al submenu
        clearTimeout();
    };

    const handleSubmenuMouseLeave = () => {
        setSubmenuOpenId(null);
    };

    return (
        <div className='lg:gap-2 xl:gap-5 border-white lg:flex lg:block hidden '>
            {dataHeader.map(({ id, name, link, submenu }) => (
                <div
                    key={id}
                    className="relative items-center group block flex hover:text-main-100"
                    onMouseEnter={() => submenu && handleMouseEnter(id)}
                    onMouseLeave={handleMouseLeave}
                    ref={submenu ? (el) => (buttonRef.current = el) : null}
                >
                    <Link href={link} className="block hover:text-main-100 hover:border-b-[1px]">
                        {name}
                    </Link>
                    {submenu && (
                        submenuOpenId === id ? <GrFormUp className='' /> : <GrFormDown className='' />
                    )}
                    {submenu && submenuOpenId === id && (
                        <div
                            ref={dropdownRef}
                            className="z-[9999] absolute top-[30px] left-0 w-48 p-2 mt-2 bg-white rounded-lg shadow-lg"
                            onMouseEnter={handleSubmenuMouseEnter}
                            onMouseLeave={handleSubmenuMouseLeave}
                        >
                            {submenu.map(subItem => (
                                <Link key={subItem.id} href={subItem.link} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-auto">
                                    {subItem.name} <hr />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}