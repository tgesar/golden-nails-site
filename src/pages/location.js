import React from 'react';

export default function Location() {
  return (
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">Our Location</h1>

      <div className="max-w-5xl mx-auto">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Golden Nails Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.7605996600274!2d-93.3813623!3d44.984396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b334feb064256f%3A0x1df10c1e3836c302!2sGolden%20Nails!5e0!3m2!1sen!2sus!4v1691549917767!5m2!1sen!2sus"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-[450px] border-0"
          ></iframe>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="https://www.google.com/maps/place/Golden+Nails/@44.984396,-93.3813623,17z/data=!3m1!4b1!4m6!3m5!1s0x52b334feb064256f:0x1df10c1e3836c302!8m2!3d44.9843922!4d-93.3787874!16s%2Fg%2F1v3kmqfg?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
