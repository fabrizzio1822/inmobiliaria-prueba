'use client';
import { useEffect } from "react";
import { useCategory } from "@/context/category";
export default function CategoryList() {
    const { fetchCategories, categories, setUpdatingCategory } = useCategory();
    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="my-5">
            {categories?.map((c) => (
                <button
                    key={c._id}
                    className="bg-bordo m-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-2 inline-block"
                    onClick={() => setUpdatingCategory(c)}
                >
                    {c.name}
                </button>
            ))}
        </div>
    );
}