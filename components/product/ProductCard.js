import Image from "next/image";
import Link from "next/link";
import { Transition } from "../Transition";
import { LiaBathSolid, LiaBedSolid, LiaRulerCombinedSolid } from "react-icons/lia";

// Define el nombre de visualización para tu componente
const ProductCard = ({ product }) => {
  return (
    <Transition className="px-4 my-8 md:py-32 md:px-40">
      <div key={product?._id} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Link
          key={product?.id}
          href={`/product/${product?.slug}`}
          className="shadow-light hover:shadow-xl rounded-2xl transition-all duration-300 cursor-pointer"
        >
          <div className="relative -z-[1]">
            <div className="relative">
              <Image
                src={product?.images?.[0]?.secure_url || "/images/default.jpg"}
                alt="Location"
                width={150}
                height={150}
                className="object-cover w-full max-h-full h-[200px] rounded-t-2xl"
              ></Image>
              <div className="px-3 py-5">
                <p className="color-bordo">{product?.location} </p>
                <p className="text-secondary">{product?.title}</p> <br />
                {product?.price > 0 && (
                  <p className="text-secondary">{product?.price}</p>
                )}
                <div className="gap-4 mt-2 px-2 xl:flex">
                  <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30 ">
                    <LiaBedSolid />
                    <span className="ml-2">{product?.habitaciones}</span>
                  </div>
                  <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30 ">
                    <LiaBathSolid />
                    <span className="ml-2">{product?.baños}</span>
                  </div>
                  <div className="flex items-center justify-center px-2 py-1 rounded-lg my-2 bg-slate-300/30 ">
                    <LiaRulerCombinedSolid />
                    <span className="ml-2">{product?.metros}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Transition>
  );
}

// Asigna un nombre de visualización al componente
ProductCard.displayName = 'ProductCard';

export default ProductCard;
