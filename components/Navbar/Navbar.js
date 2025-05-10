import React, { useState } from 'react';
import { dataHeader } from '../Header/Header.data';
import Link from 'next/link';
import { GrFormDown, GrFormUp } from 'react-icons/gr';

export function Navbar() {
    const [submenuOpen, setSubmenuOpen] = useState({});

    const toggleSubmenu = (id) => {
        setSubmenuOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className='gap-5 border-b-[1px] border-white lg:flex lg:block hidden '>
            {dataHeader.map(({ id, name, link, submenu }) => (
                <div key={id} className="relative items-center group block flex" onClick={() => submenu && toggleSubmenu(id)}>
                    <Link href={link} className="block hover:text-main-100 hover:border-b-[1px]">
                        {name}
                    </Link>
                    {submenu && (
                        submenuOpen[id] ? <GrFormUp className='' /> : <GrFormDown className=''/>
                    )}
                    {submenu && submenuOpen[id] && (
                        <div className="z-[9999] absolute top-[30px] left-0 w-48 p-2 mt-2 bg-white rounded-lg shadow-lg">
                            {submenu.map(subItem => (
                                <Link key={subItem.id} href={subItem.link} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-auto">
                                    {subItem.name} <hr></hr>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
