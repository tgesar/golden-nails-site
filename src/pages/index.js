// src/pages/index.js
import Head from 'next/head';
import Hero from '@/components/Hero';
import ServicesDropdown from '@/components/ServicesDropdown';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

export default function Home() {
  const siteUrl = 'https://goldennailsmn.com'; // change if your final domain differs
  const ogImage = `${siteUrl}/images/og-image.jpg`; // add this image to your /public/images

  const schema = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "name": "Golden Nails",
    "url": siteUrl,
    "image": ogImage,
    "telephone": "+1-763-746-4049",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7752 Hwy 55",
      "addressLocality": "Golden Valley",
      "addressRegion": "MN",
      "postalCode": "55427",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "10:00", "closes": "20:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "12:00", "closes": "17:00" }
    ],
    "sameAs": ["https://www.facebook.com/golden.nails.96"]
  };

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Golden Nails | Best Nail Salon in Golden Valley, MN</title>
        <meta
          name="description"
          content="Golden Nails is a family-owned nail salon in Golden Valley, MN offering luxury manicures, pedicures, and waxing. Book online 24/7 or walk in today."
        />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Social */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Golden Nails | Best Nail Salon in Golden Valley, MN" />
        <meta
          property="og:description"
          content="Experience professional manicures, pedicures, and waxing at Golden Nails. Trusted in Golden Valley since 2008."
        />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Optional Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Golden Nails | Golden Valley, MN" />
        <meta name="twitter:description" content="Luxury manicures, pedicures & waxing. Book online 24/7." />
        <meta name="twitter:image" content={ogImage} />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Elegant, modern fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Cream background, charcoal text, soft gold accents */}
      <div className="min-h-screen bg-[#FAF8F3] text-[#121212]">
        {/* HERO */}
        <section className="relative">
          <Hero />
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <hr className="border-t border-neutral-200 my-10" />
        </div>

        {/* HOURS + COLLAGE — premium, restrained */}
        <section className="px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.1fr,0.8fr,1.1fr] gap-8 items-center">
              {/* Left collage */}
              <div className="grid grid-cols-2 gap-4">
                {['interior1','interior2','interior3','interior4'].map((n) => (
                  <div
                    key={n}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100"
                  >
                    <img
                      src={`/images/${n}.png`}
                      alt={n}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>

              {/* Hours card */}
              <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-8 lg:p-10">
                <h2
                  className="text-3xl md:text-4xl font-semibold mb-6 text-center"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#C4A24A' }}
                >
                  Open Hours
                </h2>

                <div className="space-y-4 text-center font-medium">
                  <p className="whitespace-nowrap"><span className="text-black-500">Monday:</span> 10:00 am – 8:00 pm</p>
                  <p className="whitespace-nowrap"><span className="text-black-500">Tuesday:</span> 10:00 am – 8:00 pm</p>
                  <p className="whitespace-nowrap"><span className="text-black-500">Wednesday:</span> 10:00 am – 8:00 pm</p>
                  <p className="whitespace-nowrap"><span className="text-black-500">Thursday:</span> 10:00 am – 8:00 pm</p>
                  <p className="whitespace-nowrap"><span className="text-black-500">Friday:</span> 10:00 am – 8:00 pm</p>
                  <p className="whitespace-nowrap"><span className="text-black-500">Saturday:</span> 9:00 am – 6:00 pm</p>
                  <p className="whitespace-nowrap"><span className="text-black-500">Sunday:</span> 12:00 pm – 5:00 pm</p>
                </div>
              </div>

              {/* Right collage */}
              <div className="grid grid-cols-2 gap-4">
                {['interior5','interior6','interior7','interior8'].map((n) => (
                  <div
                    key={n}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100"
                  >
                    <img
                      src={`/images/${n}.png`}
                      alt={n}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section break */}
        <div className="max-w-7xl mx-auto px-6">
          <hr className="border-t border-neutral-200 my-16" />
        </div>

        {/* SERVICES — white card, gold heading, subtle copy */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-6 md:p-10">
              <div className="text-center mb-8">
                <h2
                  className="text-3xl md:text-4xl font-semibold"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#C4A24A' }}
                >
                  Our Services
                </h2>
                <p className="text-black mt-3">
                  Explore our full menu. Clean, simple, and easy to browse.
                </p>
              </div>

              {/* Force black text for all subheaders & prices */}
              <div className="text-black">
                <ServicesDropdown />
              </div>
            </div>
          </div>
        </section>

        {/* Section break */}
        <div className="max-w-7xl mx-auto px-6">
          <hr className="border-t border-neutral-200 my-16" />
        </div>

        {/* TESTIMONIALS — luxe card */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-6 md:p-10">
              <div className="text-center mb-8">
                <h2
                  className="text-3xl md:text-4xl font-semibold"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#C4A24A' }}
                >
                  What Our Clients Say
                </h2>
                <p className="text-neutral-600 mt-3">
                  Real words from happy customers.
                </p>
              </div>
              <TestimonialsCarousel />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
