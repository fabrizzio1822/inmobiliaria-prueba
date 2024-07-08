"use client";
import React, { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";

export default function ProductCreate() {
  const [selectedComponent, setSelectedComponent] = React.useState(null);
  const {
    product,
    setProduct,
    updatingProduct,
    setUpdatingProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploading,
    setUploading,
    uploadImages,
    deleteImage,
  } = useProduct();

  const { categories, fetchCategories } = useCategory();
  const { tags, fetchTags } = useTag();

  const imagePreviews = updatingProduct
    ? updatingProduct?.images ?? []
    : product?.images ?? [];

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <p className="text-lg font-bold mb-4">{updatingProduct ? "Actualizar" : "Crear"} Vivienda</p>

      <input
        type="text"
        placeholder="Titulo"
        value={updatingProduct ? updatingProduct?.title : product?.title}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, title: e.target.value })
            : setProduct({ ...product, title: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />

      <textarea
        rows="5"
        placeholder="Descripcion"
        value={updatingProduct ? updatingProduct?.description : product?.description}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, description: e.target.value })
            : setProduct({ ...product, description: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      ></textarea>

      <input
        type="number"
        placeholder="Precio"
        min="1"
        value={updatingProduct ? updatingProduct?.price : product?.price}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, price: e.target.value })
            : setProduct({ ...product, price: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />

      <input
        type="number"
        placeholder="Metros"
        value={updatingProduct ? updatingProduct?.metros : product?.metros}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, metros: e.target.value })
            : setProduct({ ...product, metros: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />

      <input
        type="number"
        placeholder="Número de Baños"
        min='1'
        value={updatingProduct ? updatingProduct?.baños : product?.baños}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, baños: e.target.value })
            : setProduct({ ...product, baños: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />

      <input
        type="number"
        placeholder="Número de Habitaciones"
        min="1"
        value={updatingProduct ? updatingProduct?.habitaciones : product?.habitaciones}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, habitaciones: e.target.value })
            : setProduct({ ...product, habitaciones: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />

      <input
        type="text"
        placeholder="Ubicación"
        value={updatingProduct ? updatingProduct?.location : product?.location}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, location: e.target.value })
            : setProduct({ ...product, location: e.target.value })
        }
        className="border border-gray-300 rounded-md p-2 mb-2 w-full"
      />

      <div className="form-group">
        <select
          name="category"
          onChange={(e) => {
            const categoryId = e.target.value;
            const categoryName = e.target.options[e.target.selectedIndex].getAttribute("name");
            const category = categoryId ? { _id: categoryId, name: categoryName } : null;

            if (updatingProduct) {
              setUpdatingProduct({ ...updatingProduct, category });
            } else {
              setProduct({ ...product, category });
            }
          }}
          value={updatingProduct ? updatingProduct?.category?._id : product?.category?._id}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        >
          <option value="">Seleccionar Categoria</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id} name={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 items-center mb-4">
        {tags
          ?.filter((ft) => ft?.parentCategory === (updatingProduct?.category?._id || product?.category?._id))
          ?.map((tag) => (
            <div key={tag?._id} className="form-check">
              <input
                type="checkbox"
                value={tag?._id}
                onChange={(e) => {
                  const tagId = e.target.value;
                  const tagName = tag?.name;
                  let selectedTags = updatingProduct ? [...(updatingProduct?.tags ?? [])] : [...(product?.tags ?? [])];

                  if (e.target.checked) {
                    selectedTags.push({ _id: tagId, name: tagName });
                  } else {
                    selectedTags = selectedTags.filter((t) => t._id !== tagId);
                  }

                  if (updatingProduct) {
                    setUpdatingProduct({ ...updatingProduct, tags: selectedTags });
                  } else {
                    setProduct({ ...product, tags: selectedTags });
                  }
                }}
                className="form-checkbox mr-2"
              />
              <label>{tag?.name}</label>
            </div>
          ))}
      </div>

      <div className="mb-3">
        <label className={`pointer text-white bg-bordo px-4 flex py-2 justify-center align-center  rounded-md ${uploading ? "disabled" : ""}`}>
          {uploading ? "Procesando" : "Subir Imagen"}
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={uploadImages}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="flex justify-center">
        {imagePreviews?.map((img) => (
          <div key={img?.public_id} className="mx-1">
            <img
              src={img?.secure_url}
              className="rounded-lg shadow-lg"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              alt="Product Image"
            />
            <div className="text-center cursor-pointer" onClick={() => deleteImage(img?.public_id)}>
              ❌
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => (updatingProduct ? updateProduct() : createProduct())}
          className={`btn bg-${updatingProduct ? "secondary" : "secondary"} text-white px-4 py-2 rounded-md`}
        >
          {updatingProduct ? "Actualizar" : "Crear"}
        </button>

        {updatingProduct && (
          <>
            <button onClick={() => deleteProduct()} className="bg-red-800 text-white px-4 py-2 rounded-md ml-2">
              Eliminar
            </button>
            <button onClick={() => window.location.reload()} className="bg-green-800 text-white px-4 py-2 rounded-md ml-2">
              Limpiar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
