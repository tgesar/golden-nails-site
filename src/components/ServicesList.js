import React from 'react';

const services = [
  {
    title: 'Manicure / Pedicure',
    description: 'Treat your hands and feet to professional care with a polished finish.',
    items: [
      { name: 'Basic Manicure', price: '$30' },
      { name: 'Basic Manicure Gel', price: '$40' },
      { name: 'Express Pedicure Gel', price: '$50' },
    ],
  },
  {
    title: 'Waxing',
    description: 'Smooth and clean results with gentle waxing for sensitive areas.',
    items: [
      { name: 'Eyebrows', price: '$15+' },
      { name: 'Eyebrows & Lip', price: '$25+' },
      { name: 'Chin', price: '$15+' },
      { name: 'Underarms', price: '$30+' },
      { name: 'Face Wax', price: '$40+' },
    ],
  },
  {
    title: 'Add‑Ons',
    description: 'Enhance your look with custom finishes and detail work.',
    items: [
      { name: 'Color (Dip Powder)', price: '$50+' },
      { name: 'French (Dip Powder)', price: '$55+' },
      { name: 'Gel Nail Polish Change', price: '$25+' },
      { name: 'Gel Toe Polish Change', price: '$35+' },
      { name: 'Regular Nail Polish Change', price: '$12+' },
      { name: 'Regular Toe Polish Change', price: '$20+' },
      { name: 'Nail Repair', price: '$5+' },
      { name: 'Nail Design', price: '$5+' },
      { name: 'Callus Removal', price: '$5' },
      { name: 'Nail Removal', price: '$15+' },
    ],
  },
  {
    title: 'Full Set',
    description: 'Get a full, long-lasting set that fits your style and shape preferences.',
    items: [
      { name: 'Gel Powder', price: '$45' },
      { name: 'Ombre', price: '$70' },
      { name: 'Liquid Gel', price: '$55' },
      { name: 'Pink & White Powder', price: '$70' },
      { name: 'Pink & White Liquid', price: '$80' },
      { name: '+ Gel Polish', price: '$15+' },
    ],
  },
  {
    title: 'Fill In',
    description: 'Maintain the look and strength of your current nail set.',
    items: [
      { name: 'Gel Powder', price: '$35' },
      { name: 'Liquid Gel', price: '$45' },
      { name: 'Pink & White Powder', price: '$60' },
      { name: 'Ombre', price: '$60' },
      { name: 'Pink & White Liquid', price: '$75' },
    ],
  },
];

export default function ServicesList() {
  return (
    <section className="bg-[#FFFAF0] py-16 px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center text-[#111827] mb-14 tracking-tight">
        Our Services
      </h2>
      <div className="grid gap-10 md:gap-12 max-w-5xl mx-auto">
        {services.map((category, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
          >
            <h3 className="text-2xl font-semibold text-[#9c3d1d] mb-1 tracking-wide">
              {category.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4">{category.description}</p>
            <ul className="divide-y divide-gray-100">
              {category.items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between py-2 px-2 rounded-md transition-all hover:bg-[#fff6ee] hover:scale-[1.01] duration-150"
                >
                  <span className="text-gray-800">{item.name}</span>
                  <span className="text-[#9c3d1d] font-semibold">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
