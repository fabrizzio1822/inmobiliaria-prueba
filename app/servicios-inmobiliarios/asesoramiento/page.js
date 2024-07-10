'use client'
import React, { useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react";
import { TransitionPage } from "@/components/TransitionPage";
import Image from "next/image";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import { Location } from 'akar-icons';
import Link from "next/link";
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';

async function fetchProducts(searchParams) {
    const searchQuery = new URLSearchParams({
        page: searchParams.page || 1,
        minPrice: searchParams.minPrice || "",
        maxPrice: searchParams.maxPrice || "",
        category: searchParams.category || "",
        tag: searchParams.tag || "",
        brand: searchParams.brand || "",
    }).toString();
    try {
        const response = await fetch(
            `${process.env.API}/product/filters?${searchQuery}`,
            { method: "GET" }
        );
        if (!response.ok) {
            throw new Error("Error al buscar viviendas");
        }
        const data = await response.json();
        if (!data || !Array.isArray(data.products)) {
            throw new Error("No hay viviendas");
        }

        return data;
    } catch (err) {
        console.log(err);
        return { products: [], currentPage: 1, totalPages: 1 };
    }
}

export default function Asesoramiento({ searchParams }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true); // Estado para el cargando

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true); // Activar cargando
            const { products, currentPage, totalPages } = await fetchProducts(searchParams);
            setProducts(products);
            setCurrentPage(currentPage);
            setTotalPages(totalPages);
            setLoading(false); // Desactivar cargando
        };
        getProducts();
    }, [searchParams]);

    return (
        <SessionProvider>
            <TransitionPage />
            <div className="servicios-contenedor sm:py-12">
                <div id="texto-derecha" className="servicios-contenedor-texto">
                    <h2 className="titulo-servicio sm:text-4xl text-2xl py-4 font-bold color-gris">ASESORAMIENTO INTEGRAL EN COMPRA Y VENTA DE PROPIEDADES</h2>
                    <hr />
                    <p className="py-4 color-gris">El servicio de asesoramiento en la compra y venta de propiedades desempeña un papel crucial al brindar orientación especializada a clientes que buscan realizar transacciones inmobiliarias. Este servicio integral, proporcionado por una profesional en bienes raíces, abarca desde la identificación de oportunidades hasta la gestión de cierres exitosos.</p>
                </div>
                <Image src='/assets/planos.jpg' width={1100} height={900} />
            </div>
            <div className="container mx-auto my-5">
                <div className="container mx-auto px-6 my-5">
                    <h2 className="text-3xl text-bold font-bold color-bordo py-3">Viviendas</h2>
                    <hr className="mb-4" />
                    {loading ? (
                        <Loader/> // Mostrar cargando mientras se obtienen los datos
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {products?.map((product) => (
                                <Link href={`/product/${product?.slug}`} key={product?._id} passHref>
                                    <div className="flex flex-col rounded-lg shadow-md overflow-hidden">
                                        <div className="relative h-60">
                                            <Image 
                                                src={product?.images[0]?.secure_url || '/images/default.jpg'}
                                                alt={product?.title}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="flex">
                                                <Location strokeWidth={2} size={20} className="color-bordo" /> 
                                                <p className="color-bordo px-1">{product?.location} </p>
                                            </div>
                                            <p className="my-2">{product?.title}</p> 
                                            {product?.price > 0 && (
                                                <p>${product?.price}</p>
                                            )}
                                            <p className="text-sm mb-4">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: product?.description?.length > 70 ? `${product?.description.substring(0, 70)}...` : product?.description
                                                    }}
                                                />
                                            </p>
                                        </div>
                                        <div className="gap-4 mt-2 px-2 xl:flex">
                                            <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30">
                                                <LiaBedSolid />
                                                <span className="ml-2">{product?.habitaciones}</span>
                                            </div>
                                            <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30">
                                                <LiaBathSolid />
                                                <span className="ml-2">{product?.baños}</span>
                                            </div>
                                            <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30">
                                                <LiaRulerCombinedSolid />
                                                <span className="ml-2">{product?.metros}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </SessionProvider>
    );
}
