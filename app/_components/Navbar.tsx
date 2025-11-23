"use client"
import Image from "next/image";
import logo from "../../public//Real-estate-logo-House-logo-Home-logo-Graphics-22469976-1-1-580x399.jpg"
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
      const [open, setOpen] = useState(false);
      const {user} = useUser()
  return (
    <div>
      <nav className="flex items-center bg-black justify-around border mx-4 max-md:w-full max-md:justify-between border-slate-700 px-4 py-2 w-full m-0! text-white text-lg">
    <Link href="/">
       <Image src={logo} alt="logo Real-Estate" className="rounded-full object-cover" width={80} height={80} />
           </Link>
    <div className="hidden md:flex items-center gap-6 ml-7">
        <Link href="/Real-Estate/" className="relative overflow-hidden h-6 group">
            <span>Filters</span>
        </Link>
        <Link href="/Real-Estate/new" className="relative overflow-hidden h-6 group">
            <span>Add Products</span>
        </Link>
    </div>
    <div className="hidden ml-14 md:flex items-center gap-4">
        <button
>
            Contact
        </button>
         {!user ? (
          <SignInButton>
            <Button>Get started</Button>
          </SignInButton>
        ):(
          <UserButton/>
        ) }
        
    </div>
{/* Mobile Button */}
      <button 
        onClick={() => setOpen(!open)} 
        className="md:hidden text-white"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <div className={`absolute top-24 left-0 bg-black w-full flex flex-col items-center gap-4 py-6 transition-all duration-300 
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <Link href="/Real-Estate/" className="hover:text-indigo-600">Filters</Link>
        <Link href="/Real-Estate/new" className="hover:text-indigo-600">Add Products</Link>
        <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
          Contact
        </button>
        <button
            className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
            Get Started
        </button>

    </div>
</nav>
    </div>
  )
}
