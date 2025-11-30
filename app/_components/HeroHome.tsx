import Image from "next/image";
import img from "../../public/modern-house-interior-exterior-design-46517595.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";

export default function HeroHome() {
  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Real Estate - Your Partner for Premium Properties</title>
        <meta
          name="description"
          content="Explore premium real estate solutions with us. Achieve your property goals with innovative services in a competitive market."
        />
      </Head>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[750px] w-full">
        <Image
          src={img}
          alt="Modern house interior and exterior design hero image"
          fill
          className="object-cover w-full h-full"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center px-4 md:px-0">
            <h1 className="text-4xl md:text-4xl font-bold mb-6 text-white">
              Welcome to the
              <span className="block text-[#e04141] mt-2">Real_Estate</span>
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-gray-200 ">
              Your partner for innovative solutions and premium services.
            </p>
            <p  className="text-xl md:text-2xl mb-4 text-gray-200 "> We help you achieve your property goals, 
              ensuring success in a competitive market.</p>
            <Link href="/Real-Estate">
              <Button className="bg-[#e04141] hover:bg-red-600 transition-colors">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
