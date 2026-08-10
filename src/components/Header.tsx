"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">
        <Link href="/">
          <img src="/img/logo.png" alt="Mem Connects Logo" className="h-20" />
        </Link>

        <div className="hidden lg:flex space-x-8 items-center font-semibold text-gray-700">
          <Link href="/" className="hover:text-[#F2852C] transition duration-300">Home</Link>
          <Link href="/about" className="hover:text-[#F2852C] transition duration-300">About</Link>
          <Link href="/services" className="hover:text-[#F2852C] transition duration-300">Services</Link>
          <Link href="/blogs" className="hover:text-[#F2852C] transition duration-300">Blogs</Link>
          <Link href="/contact" className="hover:text-[#F2852C] transition duration-300">Contact</Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/contact"
            className="text-sm font-semibold text-[#6D5795] border border-[#6D5795] px-5 py-2.5 rounded-lg hover:bg-[#6D5795] hover:text-white transition duration-300">
            Free Consultation
          </Link>
          <Link href="/application"
            className="text-sm font-semibold bg-[#6D5795] text-white px-5 py-2.5 rounded-lg hover:bg-[#59457A] transition duration-300 shadow-md hover:shadow-lg">
            Apply Now
          </Link>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute w-full z-30">
          <Link href="/" className="block py-3 px-6 text-base font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F2852C]">Home</Link>
          <Link href="/about" className="block py-3 px-6 text-base font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F2852C]">About</Link>
          <Link href="/services" className="block py-3 px-6 text-base font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F2852C]">Services</Link>
          <Link href="/blogs" className="block py-3 px-6 text-base font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F2852C]">Blogs</Link>
          <Link href="/contact" className="block py-3 px-6 text-base font-bold text-gray-700 hover:bg-orange-50 hover:text-[#F2852C]">Contact</Link>
          <div className="p-4 border-t border-gray-100 flex flex-col space-y-3">
            <Link href="/contact" className="w-full text-center block text-sm font-semibold text-[#6D5795] border border-[#6D5795] px-4 py-2.5 rounded-lg hover:bg-[#6D5795] hover:text-white transition duration-300">
              Free Consultation
            </Link>
            <Link href="/application" className="w-full text-center block text-sm font-semibold bg-[#6D5795] text-white px-4 py-2.5 rounded-lg hover:bg-[#6D5795] transition duration-300">
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
