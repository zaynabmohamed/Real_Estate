import CreateProperty from "@/app/_components/CreateProperty";
// app/Real-Estate/add/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Property | Zaynab Real Estate",
  description: "Add a new property to your listings. Enter all property details, images, and pricing.",
  keywords: ["add property", "real estate management", "list property", "Egypt real estate"],
  authors: [
    { name: "Zaynab Real Estate", url: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app" }
  ],
  openGraph: {
    title: "Add New Property | Zaynab Real Estate",
    description: "Add a new property to your listings. Enter all property details, images, and pricing.",
    url: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/Real-Estate/add",
    siteName: "Zaynab Real Estate",
    images: [
      {
        url: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/images/add-property.webp",
        width: 1200,
        height: 630,
        alt: "Add New Property",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Add New Property | Zaynab Real Estate",
    description: "Add a new property to your listings. Enter all property details, images, and pricing.",
    images: [
      "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/images/add-property.webp",
    ],
  },
  robots: {
    index: false, 
    follow: false,
  },
};

export default function Page() {
  
  return (
    <div className='max-w-4xl mx-auto'>

        <div className='mb-8'>
            <h2 className='my-5' >Add Property</h2>

            <CreateProperty/>
        </div>
    </div>
  )
}

