"use client";
import { useEffect } from "react";
import { useTag } from "@/context/tag";
import { useCategory } from "@/context/category";

export default function TagCreate() {
  // context
  const {
    name,
    setName,
    parentCategory,
    setParentCategory,
    updatingTag,
    setUpdatingTag,
    createTag,
    updateTag,
    deleteTag,
  } = useTag();

  const { fetchCategories, categories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="my-5">
      <input
        type="text"
        value={updatingTag ? updatingTag?.name : name}
        onChange={(e) => {
          if (updatingTag) {
            setUpdatingTag({ ...updatingTag, name: e.target.value });
          } else {
            setName(e.target.value);
          }
        }}
        className="border border-gray-300 rounded-md py-2 px-4 my-2 w-full"
      />
      <div className="form-group mt-4">
        <label className="block">Categoría Padre</label>
        <select
          name="category"
          className="form-control p-2 rounded-md border border-gray-300 w-full"
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option>Selecciona una categoría</option>
          {categories?.map((c) => (
            <option
              key={c._id}
              value={c._id}
              selected={c?._id === updatingTag?.parentCategory || c?._id === parentCategory}
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className={`bg-${updatingTag ? "secondary" : "secondary"} text-white px-4 py-2 rounded-md`}
          onClick={(e) => {
            e.preventDefault();
            updatingTag ? updateTag() : createTag();
          }}
        >
          {updatingTag ? "Actualizar" : "Crear"}
        </button>

        {updatingTag && (
          <>
            <button
              className="bg-red-800 text-white px-4 py-2 rounded-md ml-2"
              onClick={(e) => {
                e.preventDefault();
                deleteTag();
              }}
            >
              Eliminar
            </button>

            <button
              className="bg-green-800 text-white px-4 py-2 rounded-md ml-2"
              onClick={(e) => {
                e.preventDefault();
                setUpdatingTag(null);
              }}
            >
              Limpiar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
