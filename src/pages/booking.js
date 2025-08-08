// src/pages/booking.js
import Head from 'next/head';
import BookingFormCompact from '@/components/BookingFormCompact';

export default function Booking() {
  return (
    <>
      <Head>
        <title>Book an Appointment | Golden Nails</title>
      </Head>

      <section className="bg-[#FAF8F3] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-8">
            <h1
              className="text-3xl md:text-4xl font-semibold"
              style={{ fontFamily: 'Playfair Display, serif', color: '#C4A24A' }}
            >
              Book an Appointment
            </h1>
            <p className="mt-2 text-[#121212]/70">
              Choose a date, pick a time, and confirm your details. Availability updates in real time.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-7 md:p-9">
            <BookingFormCompact />
          </div>
        </div>
      </section>
    </>
  );
}
