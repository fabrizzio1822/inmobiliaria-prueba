
import { useProduct } from '@/context/product';
export default function FloatedSearch() {
  const {productSearchQuery, setProductSearchQuery , fetchProductSearchResults} = useProduct();
  return (
      <form role='search' onSubmit={fetchProductSearchResults} className="flex-col justify-evenly gap-4 py-4  bg-white rounded-md md:flex md:flex-row backdrop-blur shadow-light">
        <input type='search' placeholder='Introducí tu Provincia o la Propiedad que búscas' aria-label='search' onChange={e => setProductSearchQuery(e.target.value)} value={productSearchQuery} 
        className=' px-3 md:w-[70%] w-full md:py-2 py-4 md:mx-3'></input>
        <button type='submit'
          className="gap-4 border-[1px] rounded-lg px-14 py-5 bg-secondary flex items-center text-white justify-center cursor-pointer m-auto">
        
        </button>
      </form>
    
  );
}