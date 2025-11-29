import { Building, Fence, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WhatClientWant() {
  return (
    <div className="relative w-full  mt-12">
      
      {/* <div className="absolute inset-0 bg-black/70 z-10"></div> */}

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-5xl font-bold  text-red-500 text-center">
          What are you Looking For
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-24 text-center text-white">
          {/* Houses */}
          <div className="p-6 flex flex-col items-center justify-center bg-black/70 rounded-lg">
            <House className="h-[55px] w-[55px] md:h-[65px] md:w-[65px]" />
            <h2 className="mt-5 text-[25px] text-white!">Houses</h2>
            <p className="mt-2 text-sm md:text-base">
              Explore luxurious family homes in prestigious neighborhoods. Spacious layouts, private gardens, and elegant designs for your family to thrive.
            </p>
            <Link href="/Real-Estate?type=house" aria-label="See all houses">
              <Button className="bg-[#e04141] mt-5 hover:bg-red-600 transition-colors">
                See All houses
              </Button>
            </Link>
          </div>

          {/* Apartments */}
          <div className="p-6 flex flex-col items-center justify-center bg-black/70 rounded-lg">
            <Building className="h-[55px] w-[55px] md:h-[65px] md:w-[65px]" />
            <h2 className="mt-5 text-[25px] text-white!">Apartments</h2>
            <p className="mt-2 text-sm md:text-base">
              Modern living in luxury apartments with state-of-the-art amenities, 24/7 security, and central locations. Ideal for professionals and small families.
            </p>
            <Link href="/Real-Estate?type=apartment" aria-label="See all apartments">
              <Button className="bg-[#e04141] mt-5 hover:bg-red-600 transition-colors">
                See All apartments
              </Button>
            </Link>
          </div>

          {/* Townhouses */}
          <div className="p-6 flex flex-col items-center justify-center bg-black/70 rounded-lg">
            <Fence className="h-[55px] w-[55px] md:h-[65px] md:w-[65px]" />
            <h2 className="mt-5 text-[25px] text-white!">Town houses</h2>
            <p className="mt-2 text-sm md:text-base">
              Discover townhouses balancing privacy and community life. House-like space with easy maintenance in safe, designed communities.
            </p>
            <Link href="/Real-Estate?type=townhouse" aria-label="See all townhouses">
              <Button className="bg-[#e04141] mt-5 hover:bg-red-600 transition-colors">
                See All Town houses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
