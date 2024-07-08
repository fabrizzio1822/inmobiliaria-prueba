"use client";
import { useCategory } from "@/context/category";
export default function CategoryCreate() {
  const {
    name,
    setName,
    updatingCategory,
    setUpdatingCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();
  return (
    <div className="my-5">
      <input
        type="text"
        value={updatingCategory ? updatingCategory?.name : name}
        onChange={(e) =>
          updatingCategory
            ? setUpdatingCategory({ ...updatingCategory, name: e.target.value })
            : setName(e.target.value)
        }
        className="border border-gray-300 rounded-md py-2 px-4 my-2 w-full"
      />
      <div className="flex justify-between">
        <button
          className={`bg-${updatingCategory ? "secondary" : "secondary"} text-white px-4 py-2 rounded-md`}
          onClick={(e) => {
            e.preventDefault();
            updatingCategory ? updateCategory() : createCategory();
          }}
        >
          {updatingCategory ? "Actualizar" : "Crear"}
        </button>
        {updatingCategory && (
          <>
            <button
              className="bg-red-800 text-white px-4 py-2 rounded-md ml-2"
              onClick={(e) => {
                e.preventDefault();
                deleteCategory();
              }}
            >
              Eliminar
            </button>
            <button
              className="bg-green-800 text-white px-4 py-2 rounded-md ml-2"
              onClick={() => setUpdatingCategory(null)}
            >
              Limpiar
            </button>
          </>
        )}
      </div>
    </div>
  );
}