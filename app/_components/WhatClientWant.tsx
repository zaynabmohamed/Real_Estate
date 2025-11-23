import { Building, Fence, House } from "lucide-react";
import Image from "next/image";
import img from "../../public/modern-house-interior-exterior-design-46517595.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function WhatClientWant() {
  return (
    <div className="relative w-full sm:min-h-screen ">
      <Image src={img} className="w-full object-cove " fill alt="Hero" />
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <div className="absolute z-20 flex flex-col  justify-center">
        <div className="flex justify-center items-center mt-12">
          <h1 className="text-2xl  md:text-5xl font-bold mb-6 md:text-white  sm:text-black">
            What are you Looking For
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 text-white p-24 gap-6 text-center ">
          <div className="p-4 flex flex-col items-center justify-center bg-black/70">
            <House className="h-[55px] w-[55px] md:w-[65px] md:h-[65px]" />
            <h3 className="mt-5 text-[25px]">Houses</h3>
            <p>
              Explore luxurious family homes in prestigious neighborhoods. Featuring spacious layouts, private gardens, and elegant design touches. Each property offers privacy, comfort, and the perfect environment for your family to grow and thrive

            </p>
            <Link href="/Real-Estate?type=house">
              <Button className="bg-[#e04141] mt-5">See All houses</Button>
            </Link>
          </div>
          <div className="p-4 flex flex-col items-center justify-center bg-black/70">
            <Building className="h-[55px] w-[55px] md:w-[65px] md:h-[65px] " />
            <h3 className="mt-5 text-[25px]">Apartments</h3>
            <p>
              Experience modern living in our luxury apartments. Enjoy state-of-the-art amenities, 24/7 security, and central locations close to everything you need. Ideal for professionals and small families seeking comfort and convenience
            </p>
            <Link href="/Real-Estate?type=apartment">
              <Button className="bg-[#e04141] mt-5">See All apartments</Button>
            </Link>
          </div>
          <div className="p-4 flex flex-col items-center justify-center bg-black/70">
            <Fence className="h-[55px] w-[55px] md:w-[65px] md:h-[65px]" />
            <h3 className="mt-5 text-[25px]">Town houses</h3>
            <p>
             Discover the perfect balance between privacy and community life with our townhouse options. Enjoy house-like space with the easy maintenance of an apartment, situated in safe, thoughtfully designed communities

            </p>
            <Link href=" /Real-Estate?type=townhouse">
              <Button className="bg-[#e04141] mt-5">See All Town houses</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
