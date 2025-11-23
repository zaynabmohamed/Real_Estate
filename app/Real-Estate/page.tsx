"use client"
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import FeatureCard from "../_components/FeatureCard";
import Filters from "../_components/Filters";
import  React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyFilters } from "../Types/Type";


export interface TypeFilter{
    filter:PropertyFilters,
     setFilter:PropertyFilters
}
export default React.memo( function RealEstate() {

   const searchParams = useSearchParams();
    const property = searchParams.get("type")
    const [filter , setFilter] = useState<PropertyFilters>({})

    const getRealEstate = useQuery(api.Real_Estate.getRealEstate,filter
  //     {
  // propertyType: filter.propertyType,
  // status: filter.status,
  // minPrice: filter.minPrice ? Number(filter.minPrice) : undefined,
  // maxPrice: filter.maxPrice ? Number(filter.maxPrice) : undefined,
  // bedrooms: filter.bedrooms ? Number(filter.bedrooms) : undefined,
  // bathrooms: filter.bathrooms ? Number(filter.bathrooms) : undefined,
  //   }

);
      console.log(getRealEstate);
    if (!getRealEstate) return <p>Loading... </p>
  return (
    <div>
      <div className='p-24  mb-8 space-y-12'>
        <h2>All Real-Estate</h2>
        <div className='flex items-center justify-end'>
          <Link href="/Real-Estate/new">    
              <Button >  Add property<ArrowBigRight/></Button>
</Link>
        </div> 
     <Filters filter={filter} setFilter={setFilter} />
        {getRealEstate === undefined ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
         {[...Array(6)].map((_,i)=>(
          <div key={i} className='bg-gray-200 animate-pulse  rounded-lg '></div>
         ))}
          </div>
        ):getRealEstate.length ===  0 ? (
          <div className='text-center'>
            <h3 className=' text-xl font-semibold text-gray-600 mb-4'>No Feature Real-Estate </h3>
             <Button>Add your Rea-Estate</Button>
          </div>
        ): (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
           {getRealEstate.map((property)=>(
            <FeatureCard key={property._id} p={property}/>
           ))}
        </div>)}      
      </div>
    </div>
  )
})
