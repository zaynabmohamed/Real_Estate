"use client";

import CreateProperty from "@/app/_components/CreateProperty";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

export default React.memo( function Page() {
  const params = useParams();

  // Validate ID from URL
  const propertyId = params?.id as Id<"Real_Estate"> | undefined;
  const property = useQuery(
    api.Real_Estate.getProperty,
    propertyId ? { id: propertyId } : "skip"
  );

  // Mutation — used inside CreateProperty
  const updateProperty = useMutation(api.Real_Estate.updateProperty);

  // VALIDATION + LOADING STATES
  if (!propertyId) {
    return  <div className="text-center mt-10 text-gray-500 text-xl">
      Invalid property ID
    </div>;
  }

  if (property === undefined) {
    return <> <div className="flex justify-center mt-10">
      <div className="w-full max-w-md border rounded shadow p-4 animate-pulse">
        <div className="bg-gray-300 h-60 w-full rounded mb-4"></div>
        <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded mb-1"></div>
        <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
      </div>
    </div></>;
  }

  if (property === null) {
    return   <div className="text-center mt-10 text-red-500 text-xl">
      Property not found
    </div>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <CreateProperty 
        isEditing={true}
       initialData={property}
        updateProperty={updateProperty}
      />
    </div>
  );
})
