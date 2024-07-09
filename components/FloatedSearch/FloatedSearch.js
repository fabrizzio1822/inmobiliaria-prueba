import { Transition } from '../Transition';
import { useProduct } from '@/context/product';
import { RiSearch2Line } from 'react-icons/ri';
export default function FloatedSearch() {
  const {productSearchQuery, setProductSearchQuery , fetchProductSearchResults} = useProduct();
  return (
    <Transition className="absolute bottom-10 md:-bottom-10 left-0 right-0 w-[70%] mx-auto">
      <form role='search' onSubmit={fetchProductSearchResults} className="flex-col justify-evenly gap-4 py-4  bg-white rounded-md md:flex md:flex-row backdrop-blur shadow-light">
        <input type='search' placeholder='Introducí tu Provincia o la Propiedad que búscas' aria-label='search' onChange={e => setProductSearchQuery(e.target.value)} value={productSearchQuery} 
        className=' px-3 md:w-[70%] w-full md:py-2 py-4 md:mx-3'></input>
        <button type='submit'
          className="gap-4 border-[1px] rounded-lg px-14 py-5 bg-secondary flex items-center text-white justify-center cursor-pointer m-auto">
        <RiSearch2Line />
        </button>
      </form>
    </Transition>
    
  );
}