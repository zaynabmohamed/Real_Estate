"use client"
import React, { useCallback, useEffect, useState} from "react";
import { PropertyFilters } from "../Types/Type";
import useDebounce from "../Hook/useDebounce";

interface TypeFilter {
  filter: PropertyFilters;
  onFilterChange: (filter: PropertyFilters) => void;
}

export default function Filters({ filter, onFilterChange }: TypeFilter) {


   const [minPriceInput, setMinPriceInput] = useState(filter.minPrice || "");
  const [maxPriceInput, setMaxPriceInput] = useState(filter.maxPrice || "");

  // Debounced values
  const dMin = useDebounce(minPriceInput, 600);
  const dMax = useDebounce(maxPriceInput, 600);

  // Send ONLY debounced values to parent
  useEffect(() => {
    onFilterChange({
      ...filter,
      minPrice: dMin ? Number(dMin) : undefined,
      maxPrice: dMax ? Number(dMax) : undefined,
    });
  }, [dMin, dMax]);

// useing (usecallback) => بتعمل memorization for function  , بتمنع عمل re-render مع كل تغير في الfunction الا لو ال dependency اتغيرت
const handleFilterChange = useCallback(
  (key: keyof PropertyFilters, value: any) => {
    onFilterChange({
      ...filter,
      [key]: value === "" || value === "all" ? undefined : value,
    });
  },
  [filter, onFilterChange ]
);

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
           <label className="block text-sm font-medium mb-1">Min Price</label>
           <input
           placeholder="min price"
            type="number"
            className="w-full p-2 border rounded-md"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
          />
        </div>

        {/* Max Price */}
        <div>
           <label className="block text-sm font-medium mb-1">Max Price</label>
          <input
          placeholder="max price"
            type="number"
            className="w-full p-2 border rounded-md"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}