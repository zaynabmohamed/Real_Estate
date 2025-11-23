

"use client";

import { useState, useEffect } from "react";
import useDebounce from "../Hook/useDebounce";
import { PropertyFilters } from "../Types/Type";

interface TypeFilter{
    filter:PropertyFilters,
     onFilterChange:(filter:PropertyFilters)=>void
}
export default function Filters({ filter, onFilterChange } : TypeFilter) {
  // --- State inputs ---
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [status, setStatus] = useState("");
  const [propertyType, setPropertyType] = useState("");

  // --- Debounced values ---
  const dMin = useDebounce(minInput, 1000);
  const dMax = useDebounce(maxInput, 1500);
  const dBedrooms = useDebounce(bedrooms, 2000);
  const dBathrooms = useDebounce(bathrooms, 2500);
  const dStatus = useDebounce(status, 1000);
  const dPropertyType = useDebounce(propertyType, 3000);

  // --- Apply filters after debounce ---
  useEffect(() => {
    onFilterChange({
      ...filter,
      minPrice: dMin ? Number(dMin) : undefined,
    });
  }, [dMin]);

  useEffect(() => {
    onFilterChange({
      ...filter,
      maxPrice: dMax ? Number(dMax) : undefined,
    });
  }, [dMax]);

  useEffect(() => {
    onFilterChange({
      ...filter,
      bedrooms: dBedrooms ? Number(dBedrooms) : undefined,
    });
  }, [dBedrooms]);

  useEffect(() => {
    onFilterChange({
      ...filter,
      bathrooms: dBathrooms ? Number(dBathrooms) : undefined,
    });
  }, [dBathrooms]);

  useEffect(() => {
    onFilterChange({
      ...filter,
      status: dStatus || undefined,
    });
  }, [dStatus]);

  useEffect(() => {
    onFilterChange({
      ...filter,
      propertyType: dPropertyType || undefined,
    });
  }, [dPropertyType]);

  return (
   

     <div className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {/* property Type */}
             <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                 <select className="w-full p-2 border border-gray-300 rounded-md" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                      <option value="all">All Types</option>
                      <option value="house">house</option>
                      <option value="apartment">apartment</option>
                      <option value="condo">condo</option>
                      <option value="townhouse">townhouse</option>
                 </select>
             </div>
              {/* status  */}
             <div >
                 <label className="block text-sm font-medium text-gray-700 mb-1">Stauts</label>
                 <select className="w-full p-2 border border-gray-300 rounded-md" value={status} onChange={(e)=> setStatus(e.target.value)}>
                      <option value="all">All status</option>
                      <option value="for-sale">for-sale</option>
                      <option value="for-rent">for-rent</option>
                      <option value="sold">sold</option>
                      <option value="rented">rented</option>
                 </select>
             </div>
             {/* bedrooms */}
             <div >
                 <label className="block text-sm font-medium text-gray-700 mb-1">bedrooms</label>
                 <select className="w-full p-2 border border-gray-300 rounded-md" value={bedrooms} onChange={(e)=> setBedrooms(e.target.value)}>
                      <option value="">Any</option>
                      <option value="1">+1</option>
                      <option value="2">+2</option>
                      <option value="3">+3</option>
                      <option value="4">+4</option>
                 </select>
             </div>
             {/* Bathrooms */}
             <div >
                 <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                 <select className="w-full p-2 border border-gray-300 rounded-md" value={bathrooms} onChange={(e)=> setBathrooms( e.target.value)}>
                      <option value="">Any</option>
                      <option value="1">+1</option>
                      <option value="2">+2</option>
                      <option value="3">+3</option>
                      <option value="4">+4</option>
                 </select>
             </div>
             {/* minPrice */}
             <div >
                 <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                 <input type="number"  placeholder="Min price" className="w-full p-2 border border-gray-300 rounded-md" value={minInput } onChange={(e)=> setMinInput ( e.target.value)} />
             </div>
             {/* Max price */}
             <div >
                 <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                 <input type="number" placeholder="Max price" className="w-full p-2 border border-gray-300 rounded-md" value={maxInput} onChange={(e)=> setMaxInput( e.target.value)} />
             </div>
    
         </div>
      
     </div>
  );
}

