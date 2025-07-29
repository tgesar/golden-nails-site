import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#fff8f2] fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-start">
            <Link
  href="/"
  className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text outline-text"
>
  Golden Nails
</Link>


          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-gold-600">Home</Link>
            <Link href="/booking" className="text-gray-700 hover:text-gold-600">Booking</Link>
            <Link href="/about" className="text-gray-700 hover:text-gold-600">About</Link>
            <Link href="/location" className="text-gray-700 hover:text-gold-600">Location</Link>
            <Link href="/faq" className="text-gray-700 hover:text-gold-600">FAQ</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gold-600">Contact</Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block text-gray-700 hover:text-gold-600">Home</Link>
          <Link href="/booking" className="block text-gray-700 hover:text-gold-600">Booking</Link>
          <Link href="/about" className="text-gray-700 hover:text-gold-600">About</Link>
          <Link href="/contact" className="block text-gray-700 hover:text-gold-600">Contact</Link>
          <Link href="/faq" className="text-gray-700 hover:text-gold-600">FAQ</Link>
          <Link href="/location" className="block text-gray-700 hover:text-gold-600">Location</Link>
        </div>
      )}
    </nav>
  );
}