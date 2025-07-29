// components/BookingForm.js
import React, { useState, useEffect } from 'react';
import { services } from '../utils/services';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    timeSlot: '',
  });
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch('/api/freeBusy')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.available)) {
          setSlots(data.available);
        } else {
          setError('Failed to load time slots');
        }
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccessMsg('');
  setError('');

  const { firstName, lastName, email, phone, service, timeSlot } = formData;

  if (!firstName || !lastName || !email || !phone || !service || !timeSlot) {
    setError('Missing required fields');
    setLoading(false);
    return;
  }

  const allServices = services.flatMap(s => s.items);
  const selectedService = allServices.find(s => s.name === service);
  const duration = selectedService?.eta || 30;

  const startDateTime = new Date(timeSlot);
  const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

  const response = await fetch('/api/createEvent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      service,
      startDateTime,
      endDateTime,
    }),
  });

  const result = await response.json();
  setLoading(false);

  if (response.ok) {
    setSuccessMsg('✅ Appointment booked! A confirmation email and calendar invite has been sent.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      timeSlot: '',
    });
  } else {
    setError(result.error || 'Something went wrong');
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto text-black">
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {successMsg && <p className="text-green-600 font-semibold">{successMsg}</p>}
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full p-2 border" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full p-2 border" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border" />

      <select name="service" value={formData.service} onChange={handleChange} className="w-full p-2 border">
        <option value="">Select a Service</option>
        {services.map((category, i) => (
          <optgroup key={i} label={category.title}>
            {category.items.map((item, j) => (
              <option key={j} value={item.name}>{item.name} ({item.eta} mins)</option>
            ))}
          </optgroup>
        ))}
      </select>

      <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="w-full p-2 border">
        <option value="">Select a Time Slot</option>
        {Array.isArray(slots) && slots.map((slot, idx) => (
          <option key={idx} value={slot.start}>
            {new Date(slot.start).toLocaleString('en-US', {
              weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true, month: 'short', day: 'numeric'
            })}
          </option>
        ))}
      </select>

      <button type="submit" className="w-full bg-black text-white p-2 rounded" disabled={loading}>
        {loading ? 'Booking your appointment...' : 'Book Appointment'}
      </button>
    </form>
  );
};

export default BookingForm;
