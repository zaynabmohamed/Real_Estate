
"use client";
import Link from "next/link";
import Image from "next/image";
import { Bath, Bed, MapPin, Square } from "lucide-react";
import React from "react";
import { property } from "../Types/Type";

interface PropertyCardProps {
  p: property;
}

// ثوابت للألوان لتقليل إعادة تعريف الدوال
const STATUS_COLORS: Record<string, string> = {
  "for-sale": "bg-green-100 text-green-800",
  "for-rent": "bg-blue-100 text-blue-800",
  "sold": "bg-red-300 text-red-800",
  "rented": "bg-purple-100 text-purple-800",
};

const getStatusColor = (status: string) => STATUS_COLORS[status] || "bg-gray-100 text-gray-800";

function FeatureCard({ p }: PropertyCardProps) {
  return (
    <Link href={`/Real-Estate/${p._id}`} aria-label={`View details of ${p.title}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative h-48 w-full">
          {p.images && p.images.length > 0 ? (
            <Image
              src={p.images[0]}
              alt={`${p.title} in ${p.city}, ${p.state}`}
              fill
              className="object-cover"
              loading={p.featured ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}

          {/* Status Badge */}
          <span
            aria-label={`Status: ${p.status}`}
            className={`absolute top-4 left-4 rounded-full p-2 text-black ${getStatusColor(p.status)}`}
          >
            {p.status}
          </span>

          {/* Featured Badge */}
          {p.featured && (
            <span
              aria-label="Featured Property"
              className="absolute top-4 right-4 bg-yellow-500 p-2 rounded-full text-black"
            >
              Feature
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-900">
              {p.price.toLocaleString("en-US")} $
            </span>
            {p.status === "for-rent" && <span className="text-gray-600"> /month</span>}
          </div>

          {/* Title */}
          <h2 className="text-lg md:font-semibold text-gray-900 mb-2 line-clamp-2 sm:font-bold">{p.title}</h2>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{p.city}, {p.state}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-gray-600 mb-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span className="text-sm">{p.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span className="text-sm">{p.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span className="text-sm">{p.area}</span>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
            {p.propertyType.replace("-", " ")}
          </span>
        </div>
      </article>
    </Link>
  );
}

// تحسين أداء React.memo
export default React.memo(FeatureCard, (prev, next) => prev.p._id === next.p._id);
