import ProductCreate from "@/components/product/ProductCreate";
export default function AdminProduct() {
  return (
    <div className="container mx-auto px-4 mb-5">
      <div className="grid grid-cols-1">
        <div className="mb-4">
          <ProductCreate />
        </div>
      </div>
    </div>
  );
}