import CategoryCreate from "@/components/category/CategoryCreate";
import CategoryList from "@/components/category/CategoryList";
export default function AdminCategory() {
  return (
    <div className="container block mx-auto px-6 mb-5">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="mb-4">
          <p className="text-2xl font-bold mb-2">Crear Categoria</p>
          <CategoryCreate/>
        </div>
        
        <div className="mb-4">
          <p className="text-2xl font-bold mb-2">Lista de Categorias</p>
          <CategoryList/>
        </div>
      </div>
    </div>
  );
}