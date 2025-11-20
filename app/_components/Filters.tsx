"use client"
import React, { useContext } from "react"
import { FilterContext } from "../Context/FilterContext"
import { FilterContextType } from './../Types/Type'
export default React.memo( function Filters() {
     const {filter ,  handleFilterChange }  = useContext<FilterContextType>(FilterContext)
  return (
    <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* property Type */}
            <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" value={filter.propertyType || "all"} onChange={(e)=> handleFilterChange("propertyType" , e.target.value)}>
                     <option value="all">All Types</option>
                     <option value="house">house</option>
                     <option value="apartment">apartment</option>
                     <option value="condo">condo</option>
                     <option value="townhouse">townhouse</option>
                </select>
            </div>
             {/* status  */}
            <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stauts</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" value={filter.status || "all"} onChange={(e)=> handleFilterChange("status" , e.target.value)}>
                     <option value="all">All status</option>
                     <option value="for-sale">for-sale</option>
                     <option value="for-rent">for-rent</option>
                     <option value="sold">sold</option>
                     <option value="rented">rented</option>
                </select>
            </div>
            {/* bedrooms */}
            <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">bedrooms</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" value={filter.bedrooms || "all"} onChange={(e)=> handleFilterChange("bedrooms" , e.target.value ? Number(e.target.value) : undefined)}>
                     <option value="">Any</option>
                     <option value="1">+1</option>
                     <option value="2">+2</option>
                     <option value="3">+3</option>
                     <option value="4">+4</option>
                </select>
            </div>
            {/* Bathrooms */}
            <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" value={filter.bathrooms || "all"} onChange={(e)=> handleFilterChange("bathrooms" , e.target.value ? Number(e.target.value) : undefined)}>
                     <option value="">Any</option>
                     <option value="1">+1</option>
                     <option value="2">+2</option>
                     <option value="3">+3</option>
                     <option value="4">+4</option>
                </select>
            </div>
            {/* minPrice */}
            <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input type="number"  placeholder="Min price" className="w-full p-2 border border-gray-300 rounded-md" value={filter.minPrice || ""} onChange={(e)=>  handleFilterChange("minPrice", e.target.value  ? Number (e.target.value) : undefined)} />
            </div>
            {/* Max price */}
            <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input type="number" placeholder="Max price" className="w-full p-2 border border-gray-300 rounded-md" value={filter.maxPrice || ""} onChange={(e)=> handleFilterChange("maxPrice" , e.target.value  ?Number  (e.target.value) : undefined)} />
            </div>
    
        </div>
      
    </div>
  )
})
