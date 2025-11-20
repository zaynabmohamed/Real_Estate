"use client"
import Link from "next/link";
import { property } from "../Types/Type";
import Image from "next/image";
import { Bath, Bed, MapPin, Square } from "lucide-react";
import React from "react";

interface PropertyCardProps {
  p: property;
}
export default React.memo(function FeatureCard({ p } :PropertyCardProps){
  const getStatusColor = (status: string) => {
    switch (status) {
      case "for-sale":
        return "bg-green-100 text-green-800";
      case "for-rent":
        return "bg-blue-100 text-blue-800";
      case "sold":
        return "bg-red-300 text-red-800";
      case "rented":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <Link href={`/Real-Estate/${p?._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          {p.images && p.images.length > 0 ? (
            <Image
            loading="lazy"
              src={p.images[0]}
              alt={p?.title}
              className="object-cover"
              fill
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {/* status Badge*/}
          <div className=" absolute top-4 left-4">
            <span
              className={`bg-[#e04141] rounded-full p-2 text-black ${getStatusColor(p?.status)}`}
            >
              {p?.status}
            </span>
          </div>
          {/* Feature Badge */}
          {p?.featured && (
            <div className="absolute right-4 top-4">
              <span className="bg-yellow-500 p-2 rounded-full text-black">
                Feature
              </span>
            </div>
          )}
        </div>
        {/* Content */}
        <div className="p-4">
          {/* price */}
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-900">
              {p?.price.toLocaleString("en-US")} $
            </span>
            {p?.status === "for-rent" && (
              <span className="text-gray-600"> /month</span>
            )}
          </div>
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {" "}
            {p?.title}
          </h3>
          {/* location  */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {p?.city} , {p?.state}
            </span>
          </div>
          {/* property Details */}
          <div className="flex items-center justify-center text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span className="text-sm">{p?.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span className="text-sm">{p?.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span className="text-sm">{p?.area}</span>
              </div>
            </div>
          </div>
          {/* property Type  */}
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
              {p?.propertyType.replace("-", "")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
})
