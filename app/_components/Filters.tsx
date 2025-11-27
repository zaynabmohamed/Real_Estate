"use client";

import { useState, useEffect} from "react";
import { PropertyFilters } from "../Types/Type";

interface TypeFilter {
  filter: PropertyFilters;
  onFilterChange: (filter: PropertyFilters) => void;
}

export default function Filters({ filter, onFilterChange }: TypeFilter) {
  // const [inputs, setInputs] = useState({
  //   min: "",
  //   max: "",
  //   bedrooms: "",
  //   bathrooms: "",
  //   status: "",
  //   propertyType: "",
  // });
  // const debouncedInputs = useDebounce(inputs , 999);
  // useEffect(() => {
  //   onFilterChange({
  //     ...filter,
  //     minPrice: debouncedInputs.min ? Number(debouncedInputs.min) : undefined,
  //     maxPrice: debouncedInputs.max ? Number(debouncedInputs.max) : undefined,
  //     bedrooms: debouncedInputs.bedrooms ? Number(debouncedInputs.bedrooms) : undefined,
  //     bathrooms: debouncedInputs.bathrooms ? Number(debouncedInputs.bathrooms) : undefined,
  //     status: debouncedInputs.status || undefined,
  //     propertyType: debouncedInputs.propertyType || undefined,
  //   });
  // }, [debouncedInputs]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setInputs((prev) => ({ ...prev, [name]: value }));
  // };
  
  const handleFilterChange = (key:keyof PropertyFilters , value :any)=>{
    onFilterChange ({
      ...filter,
      [key] : value === "" || value ==="all" ? undefined : value
    })
  }


  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select name="propertyType" className="w-full p-2 border border-gray-300 rounded-md"
            value={filter.propertyType||"all"} onChange={(e)=>handleFilterChange("propertyType" , e.target.value)}>
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" className="w-full p-2 border border-gray-300 rounded-md"
            value={filter.status} onChange={(e)=>handleFilterChange("status" , e.target.value)}>
            <option value="">All Status</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <select name="bedrooms" className="w-full p-2 border border-gray-300 rounded-md"
            value={filter.bedrooms} onChange={(e)=>handleFilterChange("bedrooms",e.target.value)}>
            <option value="">Any</option>
            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="4">+4</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <select name="bathrooms" className="w-full p-2 border border-gray-300 rounded-md"
            value={filter.bathrooms} onChange={(e)=>handleFilterChange("bathrooms" ,e.target.value)}>
            <option value="">Any</option>
            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="4">+4</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <input
            name="min"
            type="number"
            placeholder="Min price"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filter.minPrice}
            onChange={(e)=>handleFilterChange("minPrice",e.target.value)}
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <input
            name="max"
            type="number"
            placeholder="Max price"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filter.maxPrice}
            onChange={(e)=>handleFilterChange("maxPrice" , e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
