'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
export const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [updatingCategory, setUpdatingCategory] = useState(null);
    const createCategory = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data);
            } else {
                toast.success("Categoria creada!");
                setName("");
                setCategories([data, ...categories]);
            }
        } catch (err) {
            console.log(err);
            toast.error('Un error ha ocurrido. Intenta otra vez');
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/category`);
            const data = await response.json();

            if (!response.ok) {
                toast.error(data);
            } else {
                setCategories(data);
            }
        } catch (err) {
            console.log(err);
            toast.error("Un error ha ocurrido. Intenta otra vez");
        }
    };
    const fetchCategoriesPublic = async () => {
        try {
          const response = await fetch(`${process.env.API}/categories`);
          const data = await response.json();
    
          if (!response.ok) {
            toast.error(data);
          } else {
            setCategories(data);
          }
        } catch (err) {
          console.log(err);
          toast.error("Un error ha ocurrido. Intenta otra vezn");
        }
    };
    const updateCategory = async () => {
        try {
            if (!updatingCategory || !updatingCategory._id) {
                toast.error("Ninguna categoria fue seleccionada");
                return;
            }
            const response = await fetch(
                `${process.env.API}/admin/category/${updatingCategory._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatingCategory),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                toast.error(data);
            } else {
                toast.success("Category Actualizada");
                setUpdatingCategory(null);
                setCategories(
                    categories.map((category) =>
                        category._id === updatingCategory._id ? data : category
                    )
                );
                setUpdatingCategory(null);
            }
        } catch (err) {
            console.log(err);
            toast.error("Un error ha ocurrido. Intenta otra vez");
        }
    };
    const deleteCategory = async () => {
        try {
            if (!updatingCategory || !updatingCategory._id) {
                toast.error("Ninguna categoria fue seleccionada");
                return;
            }
            const response = await fetch(
                `${process.env.API}/admin/category/${updatingCategory._id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await response.json();
            if (!response.ok) {
                toast.error(data);
            } else {
                toast.success("Categoria Eliminada");
                setCategories(
                    categories.filter((category) => category._id !== updatingCategory._id)
                );
                setUpdatingCategory(null);
            }
        } catch (err) {
            console.log(err);
            toast.error('Un error ha ocurrido. Intenta otra vez');
        }
    };
    return (
        <CategoryContext.Provider
            value={{
                name,
                setName,
                categories,
                setCategories,
                updatingCategory,
                setUpdatingCategory,
                createCategory,
                fetchCategories,
                fetchCategoriesPublic,
                updateCategory,
                deleteCategory,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
export const useCategory = () => useContext(CategoryContext);
