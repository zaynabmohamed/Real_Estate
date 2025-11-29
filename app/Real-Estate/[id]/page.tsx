"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Bath, Bed, Calculator, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import imgwhatsApp from "../../../public/images.whatsApp.png";
import Scheduleview from "@/app/_components/Scheduleview";
import { Id } from "@/convex/_generated/dataModel";

export default React.memo( function PageDetails() {
  const [select, setSelect] = useState(0);

  const params = useParams();
  const propertyId = params.id as Id<"Real_Estate">;

  const router = useRouter();

  // Fetch property
  const getproperty = useQuery(api.Real_Estate.getProperty, { id: propertyId });

  // Delete mutation
  const deleteproperty = useMutation(api.Real_Estate.deleteProperty);

  // Handle delete
  const handleDelete = async () => {
    try {
      await deleteproperty({ id: propertyId });
      router.push("/Real-Estate");
    } catch (error) {
      console.log("Error deleting property", error);
      alert("Failed to delete property");
    }
  };

  // Still loading?
  if (getproperty === undefined) {
    return  <> <div className="flex justify-center mt-10">
      <div className="w-full max-w-md border rounded shadow p-4 animate-pulse">
        <div className="bg-gray-300 h-60 w-full rounded mb-4"></div>
        <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div></>;
  }

  // Property not found
  if (!getproperty) {
    return  <p className="text-center mt-10 text-red-500 text-xl">
      Property not found.
    </p>;
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Buttons */}
      <div className="flex items-center mt-10 justify-end gap-3">
        <Link href={`/Real-Estate/${getproperty?._id}/edit`}>
          <Button>Edit</Button>
        </Link>

        <Button
          className="bg-red-500 text-white"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {getproperty.images?.length > 0 ? (
          <>
            <div className="relative h-96 w-full mx-auto p-4">
              <Image
                className="object-cover rounded-lg h-[350px]"
                src={getproperty.images[select]}
                alt={getproperty.title}
                height={500}
                width={1200}
              />
            </div>

            {getproperty.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto p-4">
                {getproperty.images.map((image, index) => (
                  <button key={index} onClick={() => setSelect(index)}>
                    <Image
                      src={image}
                      height={150}
                      width={200}
                      alt="image"
                      className={`object-cover w-[200px] h-[150px] rounded-md border 
                       ${index === select ? "border-red-500" : "border-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="text-gray-400 text-center block">No images available</span>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{getproperty.title}</h1>

          <div className="flex items-center gap-2">
            <MapPin />
            <span>
              {getproperty.address}, {getproperty.city}, {getproperty.state}, {getproperty.zipCode}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <p className="text-3xl text-red-600 font-bold">
              {getproperty.price} $
            </p>
            {getproperty.status === "for-rent" && (
              <span className="text-lg text-gray-600">/month</span>
            )}
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-lg border shadow-lg p-6">
            <h2 className="font-bold text-xl mb-4">Details</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Bed className="text-gray-600 mx-auto mb-2" />
                <p className="text-lg font-semibold">{getproperty.bedrooms} Bedrooms</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Bath className="text-gray-600 mx-auto mb-2" />
                <p className="text-lg font-semibold">{getproperty.bathrooms} Bathrooms</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Square className="text-gray-600 mx-auto mb-2" />
                <p className="text-lg font-semibold">{getproperty.area} sqm</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calculator className="text-gray-600 mx-auto mb-2" />
                <p className="text-lg font-semibold">{getproperty.propertyType}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg border p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{getproperty.description}</p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6 pb-6 mx-auto">
        <div className="bg-white border border-dashed border-gray-700 rounded-lg p-6">
          <h3 className="font-bold text-xl text-center">Contact Information</h3>

          <div className="mt-4 flex flex-col items-center gap-3">

            {/* Contact Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-[200px]">Contact Agent</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="sr-only">Contact Agent</DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-center gap-4">
                  <Image src={imgwhatsApp} alt="whatsapp" width={80} height={80} />
                  <Link
                    href="https://wa.me/201020910926?text=Hello👋%20Welcome!%20How%20can%20I%20help%20you%20today?"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h5 className="text-2xl font-bold">01020910926</h5>
                  </Link>
                </div>
              </DialogContent>
            </Dialog>

            {/* Schedule View */}
            <Scheduleview
              property={{
                id: propertyId,
                title: getproperty.title,
              }}
            />

          </div>
        </div>
      </div>
    </div>
  );
})
