
"use client"
import CreateProperty from "@/app/_components/CreateProperty";
import { api } from "@/convex/_generated/api";
import {useMutation, useQuery} from "convex/react";
import { useParams } from "next/navigation";


export default  function Page() {

  const params = useParams()
  const propertyId = params?.id as string;
  const property = useQuery(api.Real_Estate.getProperty, { id: propertyId });
   const updateProperty = useMutation(api.Real_Estate.updateProperty);

  if (!propertyId) return <div>Loading property ID...</div>;
  if (property=== undefined) return <div>Loading property...</div>;
  if (property === null) return <div>Property not found</div>;

  return (
    <div className=" max-w-3xl mx-auto mt-8">
      <CreateProperty
          isEditing={true}
  intialData={property}
      />
    </div>
  )
  }
