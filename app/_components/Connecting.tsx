import Image from "next/image";
import img from "../../public/modern-house-interior-exterior-design-46517595.webp";
import { Button } from "@/components/ui/button";
export default function Connecting() {
  return (
    <section className="p-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Image
        className="rounded-3xl w-full object-cover h-[450px]"
        src={img}
        alt="Modern house interior and exterior design"
        width={400}
        height={400}
         loading="lazy"
      />
      <div className="">
        <h2 className="text-[45px] text-[#e04141] leading-snug">
         
          Connecting people with perfect homes is our passion
        </h2>
        <p className="text-gray-600 mt-3 leading-relaxed">
         
          With a genuine passion for helping people find their dream homes , we
          are dedicated to connecting buyers and sellers onthe real estate
          market , Trust us to make your home buying or selling experience
          seamless and satisfying.
        </p>
        <Button className="mt-5">Read More</Button>
      </div>
    </section>
  );
}
