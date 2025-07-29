import { useState } from 'react';

const servicesData = {
  'Manicure/Pedicure': {
    description: 'Pamper your hands and feet with our relaxing manicures and pedicures.',
    services: [
      { name: 'Basic Manicure', price: '$30' },
      { name: 'Basic Manicure Gel', price: '$40' },
      { name: 'Express Pedicure Gel', price: '$50' },
    ],
  },
  'Waxing': {
    description: 'Smooth and clean results with our gentle waxing services.',
    services: [
      { name: 'Eyebrows', price: '$15+' },
      { name: 'Eyebrow and Lip', price: '$25+' },
      { name: 'Chin', price: '$15+' },
      { name: 'Underarms', price: '$30+' },
      { name: 'Face Wax', price: '$40+' },
    ],
  },
  'Add-ons': {
    description: 'Customize your nails with fun extras and enhancements.',
    services: [
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
  'Full Set': {
    description: 'Fresh full sets to achieve the perfect length and shape.',
    services: [
      { name: 'Gel Powder', price: '$45' },
      { name: 'Ombre', price: '$70' },
      { name: 'Liquid Gel', price: '$55' },
      { name: 'Pink & White Powder', price: '$70' },
      { name: 'Pink & White Liquid', price: '$80' },
      { name: '+Gel Polish', price: '$15+' },
    ],
  },
  'Fill In': {
    description: 'Keep your nails fresh and flawless with our fill-in services.',
    services: [
      { name: 'Gel Powder', price: '$35' },
      { name: 'Liquid Gel', price: '$45' },
      { name: 'Pink & White Powder', price: '$60' },
      { name: 'Ombre', price: '$60' },
      { name: 'Pink & White Liquid', price: '$75' },
    ],
  },
};

export default function ServicesDropdown() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Our Services</h2>

      <div className="mb-6">
        <select
          className="w-full p-3 border border-gray-300 rounded-md text-lg focus:ring-2 focus:ring-yellow-500"
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
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-600 text-center sm:text-left">
            {selectedCategory}
          </h3>
          <p className="text-gray-600 mb-4 text-center sm:text-left">
            {servicesData[selectedCategory].description}
          </p>
          <ul className="space-y-3">
            {servicesData[selectedCategory].services.map((service, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-2"
              >
                <span>{service.name}</span>
                <span className="text-gray-500">{service.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
