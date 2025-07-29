import React from 'react';

const imageList = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
  '/images/gallery6.jpg',
];

export default function GalleryGrid() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Our Work</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageList.map((src, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
