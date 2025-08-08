import React from 'react';

const testimonials = [
  {
    name: 'Elizabeth Brown',
    services: 'Acrylic Nails',
    stars: '★★★★★',
    quote: 'I feel very lucky to have found a nail artist who I trust… Thank you Yen!',
  },
  {
    name: 'Kim D',
    services: 'Manicure, Nail Art, Nail Designs',
    stars: '★★★★★',
    quote: 'I had a walk in appointment… thanks again V!',
  },
  {
    name: 'Jessica Stanchfield',
    services: 'Pedicure, Manicure',
    stars: '★★★★★',
    quote: 'I have been going here for 5 years and will only see Mike. He is knowledgeable, artistic, I show him a picture and he nails it everytime. He is truly amazing and I recommend him to everyone!',
  },
];

export default function TestimonialsCarousel() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-white shadow-md p-4 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600 italic mb-2">"{testimonial.quote}"</p>
            <p className="text-sm font-semibold mt-4">{testimonial.name}</p>
            <p className="text-xs text-gray-500">{testimonial.services}</p>
            <p className="text-yellow-500 text-sm">{testimonial.stars}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          href="https://www.google.com/maps/place/Golden+Nails/@44.9843922,-93.683658,11z/data=!4m12!1m2!2m1!1sgolden+nails!3m8!1s0x52b334feb064256f:0x1df10c1e3836c302!8m2!3d44.9843922!4d-93.3787874!9m1!1b1!15sCgxnb2xkZW4gbmFpbHNaDiIMZ29sZGVuIG5haWxzkgEKbmFpbF9zYWxvbqoBRhABKhAiDGdvbGRlbiBuYWlscygAMh4QASIayrZ971RUbbICLYYSTx8Bx3SFaACpg81GYN4yEBACIgxnb2xkZW4gbmFpbHPgAQA!16s%2Fg%2F1v3kmqfg?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-[#9c3d1d] text-white px-6 py-2 rounded-full text-sm font-medium shadow hover:bg-[#832f12] transition duration-200"
        >
          Read more reviews here
        </a>
      </div>
    </div>
  );
}
