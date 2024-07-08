"use client";
import { useEffect } from "react";
import { priceRanges } from "@/utils/filterData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import { useProduct } from "@/context/product";

export default function ProductFilter({ searchParams }) {
  const pathname = "/shop";
  const { minPrice, maxPrice, ratings, category, tag, brand } = searchParams;
  // context
  const { fetchCategoriesPublic, categories } = useCategory();
  const { fetchTagsPublic, tags } = useTag();
  const { fetchBrands, brands } = useProduct();

  useEffect(() => {
    fetchCategoriesPublic();
    fetchTagsPublic();
    fetchBrands();
  }, []);

  const router = useRouter();

  const activeButton = "filtros-activo";
  const button = "filtros";

  const handleRemoveFilter = (filterName) => {
    const updatedSearchParams = { ...searchParams };
    // delete updatedSearchParams[filterName];

    // if filterName is string
    if (typeof filterName === "string") {
      delete updatedSearchParams[filterName];
    }
    // if filterName is array
    if (Array.isArray(filterName)) {
      filterName?.forEach((name) => {
        delete updatedSearchParams[name];
      });
    }

    // reset page to 1 when applying new filtering options
    updatedSearchParams.page = 1;

    const queryString = new URLSearchParams(updatedSearchParams).toString();
    const newUrl = `${pathname}?${queryString}`;
    router.push(newUrl);
  };

  return (
    <div className="filtros-aside mx-5 mb-5 overflow-scroll">
      <p className="lead">Filtros</p>

      <Link className="color-bordo" href="/shop">
        Limpiar Filtros
      </Link>
      <hr></hr>
      <p className="titulo-categoria">Categorias</p>
      <div className="row d-block align-items-center mx-1 filter-scroll">
        {categories?.map((c) => {
          const isActive = category === c._id;

          const url = {
            pathname,
            query: {
              ...searchParams,
              category: c?._id,
              page: 1,
            },
          };
          return (
            <div key={c._id}>
              <Link href={url} className={isActive ? activeButton : button}>
                {c?.name}
              </Link>
              {isActive && (
                <span
                  onClick={() => handleRemoveFilter("category")}
                  className="pointer"
                >
                  X
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      {category && (
        <>
          <hr></hr>
          <p className="titulo-categoria">Tags</p>
          <div className="row d-block align-items-center mx-1 filter-scroll">
            {tags
              ?.filter((t) => t?.parentCategory === category)
              ?.map((t) => {
                const isActive = tag === t._id;

                const url = {
                  pathname,
                  query: {
                    ...searchParams,
                    tag: t?._id,
                    page: 1,
                  },
                };
                return (
                  <div key={t._id}>
                    <Link
                      href={url}
                      className={isActive ? activeButton : button}
                    >
                      {t?.name}
                    </Link>
                    {isActive && (
                      <span
                        onClick={() => handleRemoveFilter("tag")}
                        className="pointer"
                      >
                        X
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </>
      )}


    </div>
  );
}
