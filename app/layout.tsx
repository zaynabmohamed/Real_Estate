import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";
import ConvexClientProvider from "./ConvexClientProvider";
import ConnectUserToConvex from "./ConnectUsertoConvex";

export const metadata: Metadata = {
  title: "Real Estate Listings in Egypt | Buy & Rent Homes",
  description: "Discover top real estate properties in Egypt. Buy or rent apartments, villas, and houses with detailed info and high-quality images.",
  keywords: ["Real Estate Egypt", "Apartments for Sale", "Houses for Rent", "Villas in Egypt"],
  robots: "index, follow",
  alternates: {
    canonical: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app",
    languages: {
      "en": "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/en",
      "ar": "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/ar",
    },
  },
  openGraph: {
    title: "Best Real Estate Listings in Egypt",
    description: "Buy or rent apartments, villas, and houses with ease.",
    url: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate Egypt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Real Estate Listings in Egypt",
    description: "Buy or rent apartments, villas, and houses with ease.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: "Luxury Apartment in Cairo",
    description: "Spacious 3-bedroom apartment for sale in downtown Cairo.",
    url: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/property/123",
    image: "https://real-estate-s8pm-git-main-zaynabs-projects-78442352.vercel.app/images/property123.jpg",
    offers: {
      "@type": "Offer",
      price: "2000000",
      priceCurrency: "EGP"
    }
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <ConvexClientProvider>
            <Navbar />
            <ConnectUserToConvex />
            {children}
            {/* Structured Data JSON-LD */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
