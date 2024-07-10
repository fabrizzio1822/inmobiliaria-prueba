"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProduct } from "@/context/product";
import { Header } from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";
import Link from 'next/link';
import Image from 'next/image';
import { Location } from 'akar-icons';

function SearchProductsComponent() {
  const {
    setProductSearchQuery,
    setProductSearchResults,
    productSearchResults,
  } = useProduct();
  const productSearchParams = useSearchParams();
  const query = productSearchParams.get("productSearchQuery");

  useEffect(() => {
    if (query) {
      setProductSearchQuery(query);
      fetchProductResultsOnLoad(query);
    }
  }, [query]);

  const fetchProductResultsOnLoad = async (query) => {
    try {
      const response = await fetch(
        `${process.env.API}/search/products?productSearchQuery=${query}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok for search results");
      }
      const data = await response.json();
      setProductSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto my-5">
      <h4 className="mb-6">Viviendas Encontradas {productSearchResults?.length}</h4>
      <hr className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {productSearchResults?.map((product) => (
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
                  <p className="color-bordo px-1">{product?.location}</p>
                </div>
                <p className="my-2">{product?.title}</p>
                {product?.price > 0 && (
                  <p>{product?.price}</p>
                )}
                <p className="text-sm mb-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product?.description?.length > 160 ? `${product?.description.substring(0, 160)}...` : product?.description,
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
    </div>
  );
}

export default function SearchProductsPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchProductsComponent />
      </Suspense>
    </SessionProvider>
  );
}
