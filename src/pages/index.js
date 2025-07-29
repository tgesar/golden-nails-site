import Hero from '@/components/Hero';
import ServicesList from '@/components/ServicesList';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />

      {/* Open Hours with Larger Images */}
      <div className="bg-[#111] py-16 px-6 md:px-12 flex flex-col items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-7xl w-full">

          {/* Left 7 Images (3 top, 4 bottom) */}
          <div className="flex flex-col gap-4 w-1/3">
            <div className="grid grid-cols-3 gap-4">
              <img src="/images/interior1.png" alt="Interior 1" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior2.png" alt="Interior 2" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior3.png" alt="Interior 3" className="w-full h-full max-h-[336px] object-cover rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <img src="/images/interior4.png" alt="Interior 4" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior9.png" alt="Interior 9" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior10.png" alt="Interior 10" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior11.png" alt="Interior 11" className="w-full h-full max-h-[336px] object-cover rounded-md" />
            </div>
          </div>

          {/* Open Hours Center */}
          <div className="text-white text-center animate-float px-6 max-w-md w-full">
            <h2 className="text-4xl font-bold font-cursive mb-5 text-gold-500">Open Hours</h2>
            <div className="space-y-2 text-lg">
              <p><span className="font-bold">Monday:</span> 10:00 am – 8:00 pm</p>
              <p><span className="font-bold">Tuesday:</span> 10:00 am – 8:00 pm</p>
              <p><span className="font-bold">Wednesday:</span> 10:00 am – 8:00 pm</p>
              <p><span className="font-bold">Thursday:</span> 10:00 am – 8:00 pm</p>
              <p><span className="font-bold">Friday:</span> 10:00 am – 8:00 pm</p>
              <p><span className="font-bold">Saturday:</span> 9:00 am – 6:00 pm</p>
              <p><span className="font-bold">Sunday:</span> 12:00 pm – 5:00 pm</p>
            </div>
          </div>

          {/* Right 7 Images (3 top, 4 bottom) */}
          <div className="flex flex-col gap-4 w-1/3">
            <div className="grid grid-cols-3 gap-4">
              <img src="/images/interior5.png" alt="Interior 5" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior6.png" alt="Interior 6" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior7.png" alt="Interior 7" className="w-full h-full max-h-[336px] object-cover rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <img src="/images/interior8.png" alt="Interior 8" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior12.png" alt="Interior 12" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior13.png" alt="Interior 13" className="w-full h-full max-h-[336px] object-cover rounded-md" />
              <img src="/images/interior14.png" alt="Interior 14" className="w-full h-full max-h-[336px] object-cover rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section with gradient background */}
      <div className="bg-gradient-to-b from-[#fff7ef] to-white py-12">
        <ServicesList />
      </div>

      {/* Wavy SVG Divider */}
      <div className="w-full overflow-hidden -mb-1">
        <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none">
          <path fill="#fff7ef" d="M0,0 C720,100 720,0 1440,100 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-white py-12">
        <TestimonialsCarousel />
      </div>
    </div>
  );
}
