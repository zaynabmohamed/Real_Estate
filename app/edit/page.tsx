// // "use client";
// // import CreateProperty from "@/app/_components/CreateProperty";
// // import { api } from "@/convex/_generated/api";
// // import { useMutation, useQuery } from "convex/react";
// // import { useParams } from "next/navigation";

// // export default function Page() {
// //    const params = useParams();
// //   const propertyId = params.id;

// //   // IMPORTANT: لو id مش موجود → skip
// //   const property =useQuery(
// //     api.Real_Estate.getproperty ,
// //  { id : propertyId as any } );

// //    const updateProperty = useMutation(api.Real_Estate.updateProperty);
  

// //   if (!propertyId) return <div>Loading property ID...</div>;
// //   if (property === undefined) return <div>Loading property...</div>;
// //   if (property === null) return <div>Property not found</div>;

// //   return (
// //     <div>
// //       <CreateProperty
// //         isEditing={true}
// //         intialData={property}
// //         propertyId={propertyId}
// //       />
// //     </div>
// //   );
// // }


"use client"
import CreateProperty from "@/app/_components/CreateProperty";
import { api } from "@/convex/_generated/api";
import {useMutation, useQuery} from "convex/react";
import { useParams } from "next/navigation";


export default  function Page() {

  const params = useParams()
  const propertyId = params.id as string;
  const property = useQuery(
    propertyId ? api.Real_Estate.getProperty : "skip",
    propertyId ? { _id: propertyId } : undefined
  );
   const updateProperty = useMutation(api.Real_Estate.updateProperty);

  if (!propertyId) return <div>Loading property ID...</div>;
  if (property=== undefined) return <div>Loading property...</div>;
  if (property === null) return <div>Property not found</div>;

  return (
    <div className=" max-w-3xl mx-auto mt-8">
      <CreateProperty
        isEditing={true}
         intialData={EditeID}
         property={propertyId}
      />
    </div>
  )
  }
