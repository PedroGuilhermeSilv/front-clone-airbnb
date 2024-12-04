'use client';

import useSearchModal, {SearchQuery} from "../hooks/useSearchModels";
import { useState } from "react";

import Image from "next/image";
const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState('');

  const _setCategory = (_category: string) => {
    setCategory(_category);
    
    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bathrooms: searchModal.query.bathrooms,
      bedrooms: searchModal.query.bedrooms,
      category: _category,
    }

    searchModal.setQuery(query);
  }
  return (
    <div className="cursor-pointer pt-3 pb-6 flex items-center space-x-12">
      <div
      onClick={() => _setCategory("")}
      className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category=="All" ?"border-gray-800":"border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
          src="/icon.jpg"
          width={30}
          height={30}
          alt="icon"
        />
        <span className="text-xs">All</span> 
      </div>
      <div
      onClick={() => _setCategory("Beach")}
      className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category=="Beach" ?"border-gray-800":"border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
          src="/icon.jpg"
          width={30}
          height={30}
          alt="icon"
        />
        <span className="text-xs">Beach</span> 
      </div>
      <div 
      onClick={()=> _setCategory("Villas")}
      className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category=="Villas" ?"border-gray-800":"border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
          src="/icon.jpg"
          width={30}
          height={30}
          alt="icon"
        />
        <span className="text-xs">Villas</span>  
      </div>
      <div
       onClick={()=> _setCategory("Cabins")}
       className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category=="Cabins" ?"border-gray-800":"border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
          src="/icon.jpg"
          width={30}
          height={30}
          alt="icon"
        />
        <span className="text-xs">Cabins</span> 
      </div>
    </div>
  );
};

export default Categories;
