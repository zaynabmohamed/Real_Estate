"use client"
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import FeatureCard from "../_components/FeatureCard";
import Filters from "../_components/Filters";
import React, { useState, useMemo } from "react";
import { PropertyFilters } from "../Types/Type";

export default React.memo(function RealEstate() {
  const [filter, setFilter] = useState<PropertyFilters>({});

  const formattedFilter = useMemo(() => ({
    status: filter.status,
    propertyType: filter.propertyType,
    minPrice: filter.minPrice ? Number(filter.minPrice) : undefined,
    maxPrice: filter.maxPrice ? Number(filter.maxPrice) : undefined,
    bedrooms: filter.bedrooms ? Number(filter.bedrooms) : undefined,
    bathrooms: filter.bathrooms ? Number(filter.bathrooms) : undefined,
  }), [filter]);

  const getRealEstate = useQuery(api.Real_Estate.getRealEstate, formattedFilter);

  if (getRealEstate === undefined) return<><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded shadow p-2 animate-pulse"
          >
            <div className="bg-gray-300 h-40 w-full rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded mb-1"></div>
            <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
          </div>
        ))}
      </div></>;

  return (
    <div className="p-8 md:p-24 space-y-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Real-Estate</h2>
        <Link href="/Real-Estate/new">
          <Button aria-label="Add new property">
            Add property <ArrowBigRight />
          </Button>
        </Link>
      </div>

      <Filters filter={filter} onFilterChange={setFilter} />

      {getRealEstate.length === 0 ? (
        <div className='text-center'>
          <h3 className='text-xl font-semibold text-gray-600 mb-4'>No Real-Estate Found</h3>
          <Link href="/Real-Estate/new">
            <Button>Add your Real-Estate</Button>
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {getRealEstate.map((property) => (
            <FeatureCard key={property._id} p={property} />
          ))}
        </div>
      )}
    </div>
  )
})
