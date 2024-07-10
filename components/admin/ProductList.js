import React, { useEffect, useState } from "react";
import { useProduct } from "@/context/product";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from 'next/image'
import { useSession } from "next-auth/react";
import Loader from "../Loader/Loader";
import AdminProduct from "../AdminPages/AdminProduct/AdminProduct"; 
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
export default function ProductList(){
    const { data, status } = useSession();
    const { products, currentPage, totalPages, fetchProducts, setUpdatingProduct } = useProduct();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = searchParams.get('page');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        fetchProducts(page);
    }, [page]);
    const handleClick = (product) => {
        setUpdatingProduct(product);
        setSelectedProduct(product);
        setSelectedComponent(<AdminProduct product={product} />);
    };
    if (status === 'loading') {
        return <Loader />;
    }
    return (
        <div className="container mx-auto my-5">
            {selectedComponent ? (
                <div>
                    {selectedComponent}
                </div>
            ) : (
                <div className="container mx-auto my-5">
                    <p className="text-2xl font-bold mb-2">Listado de Viviendas</p>
                    <hr className="mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {products?.map((product) => (
                            <div key={product?._id} className="flex flex-col rounded-lg shadow-md overflow-hidden">
                                <div className="relative h-60">
                                    <Image 
                                        src={product?.images[0]?.secure_url || '/images/default.jpg'}
                                        alt={product?.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <button className="cursor-pointer text-xl font-bold mb-2" onClick={() => handleClick(product)}>
                                        ${product?.price?.toFixed(2)} {product?.title}
                                    </button>
                                    <p className="text-sm mb-4">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: product?.description?.length > 160 ? `${product?.description.substring(0,160)}...` 
                                                : product?.description
                                            }}
                                        />
                                    </p>
                                </div>
                                <div className="gap-4 mt-2 px-2 xl:flex">
                                <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30 ">
                                    <LiaBedSolid/>
                                    <span className="ml-2">{product?.habitaciones}</span>
                                </div>
                                <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30 ">
                                    <LiaBathSolid/>
                                    <span className="ml-2">{product?.baños}</span>
                                </div>
                                <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30 ">
                                    <LiaRulerCombinedSolid/>
                                    <span className="ml-2">{product?.metros}</span>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
