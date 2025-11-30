import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";
import ConvexClientProvider from "./ConvexClientProvider";
import ConnectUserToConvex from "./ConnectUsertoConvex";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Premium Real Estate in Egypt | Apartments, Villas & Land",
  description: "Find your ideal property quickly and easily with the best real estate offers in Egypt. Apartments, villas, and land for sale or rent.",
  keywords: ["real estate", "Egypt", "apartments for sale", "villas for rent", "property investment", "Egypt real estate"],
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
    description: "Find your ideal property quickly and easily with the best real estate offers in Egypt. Apartments, villas, and land for sale or rent.",
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
    description: "Find your ideal property quickly and easily with the best real estate offers in Egypt. Apartments, villas, and land for sale or rent.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>
    <html lang="en">
      
      <body
       className="antialiased"
      >
        <ConvexClientProvider>
     
          <Navbar/>
            <ConnectUserToConvex/>
          {children}
          </ConvexClientProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
