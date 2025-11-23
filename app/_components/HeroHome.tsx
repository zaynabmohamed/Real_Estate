import Image from "next/image";
import img from "../../public/modern-house-interior-exterior-design-46517595.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function HeroHome() {
  return (
    <div className="relative overflow-hidden h-[750px] w-full ">
      <Image
        src={img}
        className="w-full h-[750px] object-cover"
        alt="Hero"
        fill
      />
      <div className="absolute inset-0 bg-black/80">
        <div className="absolute inset-0  top-40 items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl md:text-7xl font-bold mb-6 text-white">
              Welcome to the{" "}
              <span className="block text-[#e04141] mt-2">Real_Estate</span>
            </h1>
            {/* Description */}
            <p className="text-xl md:text-2xl mb-8 text-gray-200 ">
             your partner for innovative solutions and premium services. We help you achieve your property goals, ensuring success in a competitive market.
            </p>
           <Link href="/Real-Estate"><Button className="bg-[#e04141]">Get started Now</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
