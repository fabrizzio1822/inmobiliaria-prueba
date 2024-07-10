'use client'
import Footer from "@/components/Footer/Footer";
import Form from "@/components/Form/Form";
import ProductImage from "@/components/product/ProductImage";
import { formatPrice } from "@/utils/formatPrice";
import { SessionProvider } from "next-auth/react";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import { TfiLocationPin } from "react-icons/tfi";
async function getProduct(slug) {
    const response = await fetch(`${process.env.API}/product/${slug}`, {
        method: "GET",
        next: { revalidate: 1 },
    });
    if (!response.ok) {
        throw new Error("Error al encontrar producto");
    }
    const data = await response.json();
    return data;
}
export default async function ProductViewPage({ params }) {
    const product = await getProduct(params?.slug);
    return (
        <SessionProvider>
            <main className="max-w-6xl container pb-12 mx-auto block block">
                <div className="grid grid-cols-[100%,1fr] m-auto my-3 py-5">
                    <div className="px-6">
                        <h1 className="text-3xl mb-4 text-secondary md:flex block justify-between">
                            <span>{product?.title}</span>
                            {product?.price > 0 && (
                                <span className="font-semibold">{formatPrice(product?.price)}</span>
                            )}
                        </h1>
                        <div className="flex gap-5 my-4">
                            <h2 className="flex gap-3 text-xl items-center">
                                <TfiLocationPin />
                                {product?.location}
                            </h2>
                        </div>
                        <ProductImage product={product} />
                        <div className="gap-4 lg:flex mt-4">
                            <div className="flex items-center justify-center px-2 py-1 my-1 rounded-lg bg-slate-300/30">
                                <LiaBedSolid />
                                <span className="ml-2">{product?.habitaciones}</span>
                            </div>
                            <div className="flex items-center justify-center px-2 py-1 my-1 rounded-lg bg-slate-300/30">
                                <LiaBathSolid />
                                <span className="ml-2">{product?.baños}</span>
                            </div>
                            <div className="flex items-center justify-center px-2 py-1 my-1 rounded-lg bg-slate-300/30">
                                <LiaRulerCombinedSolid />
                                <span className="ml-2">{product?.metros}</span>
                            </div>
                        </div>
                        <div className="my-3">
                            {product?.description}
                        </div>
                    </div>
                </div>
                <Form/>
            </main>
            <Footer/>
        </SessionProvider>
    )
}