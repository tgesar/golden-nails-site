import React from 'react';
import { FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-4 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

      <div className="flex items-center gap-3">
        <FaEnvelope className="text-gold-600" />
        <a href="mailto:goldennailsgv@gmail.com">goldennailsgv@gmail.com</a>
      </div>

      <div className="flex items-center gap-3">
        <FaPhone className="text-gold-600" />
        <a href="tel:7637464049">(763) 746‑4049</a>
      </div>

      <div className="flex items-center gap-3">
        <FaFacebook className="text-gold-600" />
        <a href="https://www.facebook.com/golden.nails.96?mibextid=sCpJLy" target="_blank" rel="noopener noreferrer">
          Facebook Page
        </a>
      </div>

      <div className="flex items-center gap-3">
        <FaMapMarkerAlt className="text-gold-600" />
        <span>7752 Hwy 55, Golden Valley, MN 55427</span>
      </div>

      <div className="flex items-start gap-3">
        <FaClock className="text-gold-600 mt-1" />
        <div>
          <p>Mon–Fri: 10 AM–8 PM</p>
          <p>Sat: 9 AM–6 PM</p>
          <p>Sun: 12 PM–5 PM</p>
        </div>
      </div>
    </div>
  );
}
