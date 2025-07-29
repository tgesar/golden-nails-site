import { useState } from 'react';

const servicesData = {
  'Manicure/Pedicure': {
    description: 'Pamper your hands and feet with our relaxing manicures and pedicures.',
    services: [
      { name: 'Basic Manicure', price: '$20' },
      { name: 'Basic Manicure Gel', price: '$25' },
      { name: 'Express Pedicure Gel', price: '$35' },
    ],
  },
  'Waxing': {
    description: 'Smooth and clean results with our gentle waxing services.',
    services: [
      { name: 'Eyebrows', price: '$10' },
      { name: 'Eyebrow and Lip', price: '$15' },
      { name: 'Chin', price: '$8' },
      { name: 'Underarms', price: '$15' },
      { name: 'Face Wax', price: '$25' },
    ],
  },
  'Add-ons': {
    description: 'Customize your nails with fun extras and enhancements.',
    services: [
      { name: 'Color (Dip Powder)', price: '$45' },
      { name: 'French (Dip Powder)', price: '$50' },
      { name: 'Gel Nail Polish Change', price: '$20' },
      { name: 'Gel Toe Polish Change', price: '$25' },
      { name: 'Regular Nail Polish Change', price: '$10' },
      { name: 'Regular Toe Polish Change', price: '$12' },
      { name: 'Nail Repair', price: '$5+' },
      { name: 'Nail Design', price: '$5+' },
      { name: 'Callus Removal', price: '$10' },
      { name: 'Nail Removal', price: '$15' },
    ],
  },
  'Full Set': {
    description: 'Fresh full sets to achieve the perfect length and shape.',
    services: [
      { name: 'Gel Powder', price: '$40' },
      { name: 'Ombre', price: '$50' },
      { name: 'Liquid Gel', price: '$55' },
      { name: 'Pink & White Powder', price: '$60' },
      { name: 'Pink & White Liquid', price: '$65' },
      { name: '+Gel Polish', price: '$10' },
    ],
  },
  'Fill In': {
    description: 'Keep your nails fresh and flawless with our fill-in services.',
    services: [
      { name: 'Gel Powder', price: '$30' },
      { name: 'Liquid Gel', price: '$35' },
      { name: 'Pink & White Powder', price: '$40' },
      { name: 'Ombre', price: '$45' },
      { name: 'Pink & White Liquid', price: '$50' },
    ],
  },
};

export default function ServicesDropdown() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>

      <div className="mb-4">
        <select
          className="w-full p-3 border rounded text-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a Service Category</option>
          {Object.keys(servicesData).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-600">{selectedCategory}</h3>
          <p className="text-gray-600 mb-4">{servicesData[selectedCategory].description}</p>
          <ul className="space-y-2">
            {servicesData[selectedCategory].services.map((service, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>{service.name}</span>
                <span className="text-gray-600">{service.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}