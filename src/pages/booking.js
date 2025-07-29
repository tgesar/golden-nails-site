import React, { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';

export default function Booking() {
  const [busySlots, setBusySlots] = useState([]);

  useEffect(() => {
    const fetchBusySlots = async () => {
      try {
        const res = await fetch('/api/freeBusy');
        const data = await res.json();
        setBusySlots(data.busy || []);
      } catch (error) {
        console.error('Failed to fetch busy slots:', error);
      }
    };

    fetchBusySlots();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 mt-24">
      <h1 className="text-4xl font-bold text-gold-700 mb-6">Book an Appointment</h1>
      <p className="mb-6">
        Use the form below to book an appointment. Available time slots are shown based on real-time availability.
      </p>
      <BookingForm busySlots={busySlots} />
    </div>
  );
}
