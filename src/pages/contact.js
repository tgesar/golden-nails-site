import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaClock } from 'react-icons/fa';

export default function Contact() {
  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 bg-center bg-cover"
      style={{
        backgroundImage: "url('/images/vietnamflag.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        backgroundBlendMode: 'lighten',
      }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-orange-600" />
            <span>goldennailsgv@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="text-orange-600" />
            <span>(763) 746-4049</span>
          </div>
          <div className="flex items-center space-x-3">
  <FaFacebookF className="text-orange-600" />
  <a
    href="https://www.facebook.com/golden.nails.96"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-700 underline hover:text-blue-900"
  >
    Facebook Page
  </a>
</div>

          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-orange-600" />
            <span>7752 Hwy 55, Golden Valley, MN 55427</span>
          </div>
          <div className="flex items-start space-x-3">
            <FaClock className="text-orange-600 mt-1" />
            <div>
              <div>Mon–Fri: 10 AM–8 PM</div>
              <div>Sat: 9 AM–6 PM</div>
              <div>Sun: 12 PM–5 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
