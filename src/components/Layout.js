// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget'; // ⬅️ add this import

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fffdf7] text-gray-900">
      <Navbar />
      <main className="flex-grow">{children}</main>

      {/* Site-wide chat widget (bottom-right) */}
      <ChatWidget />

      <Footer />
    </div>
  );
}
