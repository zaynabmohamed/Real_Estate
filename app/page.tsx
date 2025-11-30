import Connecting from "./_components/Connecting";
import FeatureRealestate from "./_components/FeatureRealestate";
import HeroHome from "./_components/HeroHome";
import WhatClientWant from "./_components/WhatClientWant";
import WhatweDo from "./_components/WhatweDo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Real Estate in Egypt | Apartments, Villas & Land",
  description: "Discover your ideal property in Egypt easily and quickly. Browse the best apartments, villas, and land for sale or rent.",
  keywords: ["real estate", "Egypt", "apartments for sale", "villas for rent", "property investment"],
  authors: [{ name: "Zaynab Real Estate", url: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app" }],
  creator: "Zaynab Real Estate",
  publisher: "Zaynab Real Estate",
  metadataBase: new URL("https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-EG": "/ar",
    },
  },
  openGraph: {
    title: "Premium Real Estate in Egypt | Apartments, Villas & Land",
    description: "Discover your ideal property in Egypt easily and quickly. Browse the best apartments, villas, and land for sale or rent.",
    url: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app",
    siteName: "Zaynab Real Estate",
    images: [
      {
        url: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/images%20(1).jpeg",
        width: 1200,
        height: 630,
        alt: "Premium Real Estate in Egypt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Real Estate in Egypt | Apartments, Villas & Land",
    description: "Discover your ideal property in Egypt easily and quickly. Browse the best apartments, villas, and land for sale or rent.",
    images: [
      "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/images%20(1).jpeg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <div >
   <HeroHome/>
   <FeatureRealestate/>
   <WhatweDo/>
   <Connecting/>
   <WhatClientWant />
    </div>
  )
}
