"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Bath, Bed, Calculator, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import imgwhatsApp from "../../../public/images.whatsApp.png"
import Scheduleview from "@/app/_components/Scheduleview";
import { Id } from "@/convex/_generated/dataModel";

export default function PageDetails() {
  const [select, setSelect] = useState(0);
  const params = useParams();
  const propertyId = params.id  as Id<"Real_Estate">;
  const router = useRouter();
  const getproperty = useQuery(api.Real_Estate.getProperty, { id: propertyId });
  const deleteproperty = useMutation(api.Real_Estate.deleteProperty);
  // function Delete product
  const handleDelete = async () => {
    try {
      await deleteproperty({ id: params.id as any });
      router.push("/Real-Estate");
    } catch (error) {
      console.log("Error deleting property", error);
      alert("Failed to delete property");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Button Delete and Edite */}
      <div className="flex items-center mt-10 justify-end ">
        <Link href={`/Real-Estate/${getproperty?._id}/edit`}>
        <Button>Edite</Button>
        </Link>
        <Button
          className="bg-red-500 ml-4 text-white  cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
      {/* Image Gallery */}
      <div className="mb-8">
        {getproperty?.images && getproperty.images.length > 0 ? (
          <div className="space-y-2">
            <div className="relative h-96 w-full mx-auto p-4">
              <Image
                className="object-cover rounded-lg h-[350px] mt-6"
                src={getproperty?.images[select]}
                alt={getproperty.title}
                height={500}
                width={1200}
              />
            </div>
            {getproperty?.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto mx-auto p-4">
                {getproperty?.images?.map((image, index) => (
                  <button key={index} onClick={() => setSelect(index)}>
                    <Image
                      src={image}
                      height={200}
                      width={350}
                      alt="image"
                      className="object-cover w-[200px] h-[150px]"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400"> No images aailable</span>
        )}
      </div>
      {/* Content image*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/*  Desc image */}
        <div className="lg:col-span-2 space-y-6 mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 ">
            {getproperty?.title}
          </h1>
          <div className="flex items-center">
            <MapPin />
            <span>
              {getproperty?.address} , {getproperty?.city} ,{" "}
              {getproperty?.state} , {getproperty?.zipCode}
            </span>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <p className="text-3xl text-red-600 mb-4 font-bold">
              {getproperty?.price} $
            </p>
            {getproperty?.status === "for-rent" && (
              <span className="text-lg text-gray-600"> /month</span>
            )}
          </div>
          {/* property Details */}
          <div className="bg-white rounded-lg border  mx-auto shadow-lg">
            <h2 className="mt-5 p-2">Details ...{getproperty?.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-6 gap-4 mt-4">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Bed className="text-gray-600 mx-auto mb-2" />
                <p className="text-xl font-semibold">
                  {getproperty?.bedrooms} Bedrooms
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Bath className="text-gray-600 mx-auto mb-2" />
                <p className="text-xl font-semibold">
                  {getproperty?.bathrooms} Bathrooms
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Square className="text-gray-600 mx-auto mb-2" />
                <p className="text-xl font-semibold">
                  {getproperty?.area} area
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Calculator className="text-gray-600 mx-auto mb-2" />
                <p className="text-xl font-semibold">
                  {getproperty?.propertyType} Type
                </p>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="bg-white rounded-lg border p-6 mb-8 shadow-lg">
            <h3 className="text-lg font-bold"> * Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {getproperty?.description}
            </p>
          </div>
        </div>
      </div>
          {/* Sidebar */}
        <div className="space-y-6  pb-4 mb-4 mx-auto ">
          <div className="bg-white rounded-lg border border-dashed border-gray-800 p-6 ">
            <h3 className="font-bold text-xl">Contact InFormation</h3>
            <div className="space-y-3 mt-4 flex flex-col items-center justify-center">
             <Dialog>
  <DialogTrigger asChild>
    <Button className="w-[200px]">Contact Agent</Button>
  </DialogTrigger>
  <DialogContent className="w-full h-auto">
    <DialogTitle className="sr-only">Contact Agent</DialogTitle>
   <DialogHeader>
  <div className="flex items-center justify-center gap-4">
    <Image src={imgwhatsApp} alt="whatsapp" width={100} height={100} />
    <Link href="https://wa.me/201020910926?text=Hello%21%20%F0%9F%91%8B%20Welcome%2C%20and%20thank%20you%20for%20visiting%20my%20profile.%20How%20can%20I%20help%20you%20today%3F" target="_blank" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer"><h5 className="text-2xl">01020910926</h5></Link>
  </div>
</DialogHeader>

  </DialogContent>
</Dialog>

    {getproperty && (
  <Scheduleview 
    property={{   
      id: propertyId,
      title: getproperty.title,
    }}
  />
)}
            </div>
          </div>
        </div>
    </div>
  );
}