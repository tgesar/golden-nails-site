// src/components/BookingFormCompact.js
import React, { useEffect, useMemo, useState } from 'react';

/* ---------- Helpers ---------- */
// Return YYYY-MM-DD for a given ISO time in a specific time zone
function ymdInTZ(iso, tz = 'America/Chicago') {
  // en-CA gives ISO-like YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz }).format(new Date(iso));
}

// Group slots by LOCAL date (America/Chicago), not UTC
function groupByDate(slots = []) {
  return slots.reduce((acc, s) => {
    const key = ymdInTZ(s.start, 'America/Chicago'); // e.g. "2025-08-08"
    (acc[key] ||= []).push(s);
    return acc;
  }, {});
}


// ✅ Format a YYYY-MM-DD as a LOCAL date (no UTC shift)
function fmtDateLabelLocal(ymd) {
  if (!ymd) return '';
  const [y, m, d] = ymd.split('-').map(Number);
  const local = new Date(y, (m || 1) - 1, d || 1); // local midnight
  return local.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago',
  });
}

/* ---------- Services (categories + items) ---------- */
const servicesData = {
  'Manicure/Pedicure': [
    { name: 'Basic Manicure', price: '$30' },
    { name: 'Basic Manicure Gel', price: '$40' },
    { name: 'Express Pedicure Gel', price: '$50' },
  ],
  Waxing: [
    { name: 'Eyebrows', price: '$15+' },
    { name: 'Eyebrow and Lip', price: '$25+' },
    { name: 'Chin', price: '$15+' },
    { name: 'Underarms', price: '$30+' },
    { name: 'Face Wax', price: '$40+' },
  ],
  'Add-Ons': [
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
  'Full Set': [
    { name: 'Gel Powder', price: '$45' },
    { name: 'Ombre', price: '$70' },
    { name: 'Liquid Gel', price: '$55' },
    { name: 'Pink & White Powder', price: '$70' },
    { name: 'Pink & White Liquid', price: '$80' },
    { name: '+ Gel Polish', price: '$15+' },
  ],
  'Fill In': [
    { name: 'Gel Powder', price: '$35' },
    { name: 'Liquid Gel', price: '$45' },
    { name: 'Pink & White Powder', price: '$60' },
    { name: 'Ombre', price: '$60' },
    { name: 'Pink & White Liquid', price: '$75' },
  ],
};
const serviceCategories = Object.keys(servicesData);

/* ---------- Component ---------- */
export default function BookingFormCompact() {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');

  // date & time
  const [date, setDate] = useState('');       // YYYY-MM-DD
  const [time, setTime] = useState(null);     // selected slot object

  // contact
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [phone,     setPhone]     = useState('');

  // service via pills
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);
  const [service, setService] = useState(''); // selected service name

  // Load availability
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/freeBusy');
        const data = await res.json();
        const available = Array.isArray(data.available) ? data.available : [];
        setSlots(available);

        // Pick first available date by default
        const byDate = groupByDate(available);
        const first = Object.keys(byDate)[0];
        if (first) setDate(first);
      } catch (e) {
        console.error(e);
        setError('Failed to load availability.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const byDate = useMemo(() => groupByDate(slots), [slots]);
  const timesForDate = useMemo(() => (date ? (byDate[date] || []) : []), [byDate, date]);

  // Form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !phone || !service || !time) {
      setError('Please complete all fields and choose a time.');
      return;
    }

    const startDateTime = time.start;
    const endDateTime =
      time.end || new Date(new Date(time.start).getTime() + 30 * 60000).toISOString();

    try {
      const res = await fetch('/api/createEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          service,
          timeSlot: startDateTime,
          startDateTime,
          endDateTime,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Booking failed');

      alert('✅ Appointment booked! A confirmation and calendar invite will be sent to your email.');
      setFirstName(''); setLastName(''); setEmail(''); setPhone('');
      setService(''); setTime(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Booking failed.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* 1) Service selection (pills) */}
      <div>
        <label className="block text-sm font-medium text-[#121212] mb-2">Service</label>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {serviceCategories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => { setActiveCategory(cat); setService(''); }}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? 'bg-[#121212] text-white border-[#121212]'
                    : 'bg-white text-[#121212] border-neutral-300 hover:border-[#C4A24A]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {servicesData[activeCategory].map((item, i) => {
            const active = service === item.name;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setService(item.name)}
                className={`text-left rounded-xl border px-4 py-3 transition ${
                  active
                    ? 'bg-[#C4A24A] text-white border-[#C4A24A]'
                    : 'bg-white text-[#121212] border-neutral-200 hover:border-[#C4A24A]'
                }`}
                title={item.price}
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm opacity-70">{item.price}</div>
              </button>
            );
          })}
        </div>

        {service && (
          <div className="mt-2 text-sm text-[#121212]/80">
            Selected: <span className="font-medium">{service}</span>
          </div>
        )}
      </div>

      {/* 2) Date */}
      <div>
        <label className="block text-sm font-medium text-[#121212] mb-1">Date</label>
        <input
          type="date"
          className="w-full rounded-xl border border-neutral-200 p-3 focus:ring-2 focus:ring-[#C4A24A]"
          value={date}
          onChange={(e) => { setDate(e.target.value); setTime(null); }}
          min={Object.keys(byDate)[0] || undefined}
          max={Object.keys(byDate).slice(-1)[0] || undefined}
        />
        {date && (
          <div className="mt-2 text-sm text-[#121212]/70">
            {/* ✅ fixed label */}
            Showing times for {fmtDateLabelLocal(date)}
          </div>
        )}
      </div>

      {/* 3) Time buttons */}
      <div>
        <label className="block text-sm font-medium text-[#121212] mb-2">Time</label>
        {loading && <div className="text-sm text-neutral-500">Loading availability…</div>}
        {!loading && date && (timesForDate?.length ?? 0) === 0 && (
          <div className="text-sm text-neutral-500">No times available for this date.</div>
        )}
        <div className="flex flex-wrap gap-2">
          {(timesForDate || []).map((slot, i) => {
            const active = time?.start === slot.start;
            return (
              <button
                type="button"
                key={i}
                onClick={() => setTime(slot)}
                className={`rounded-xl border px-3 py-2 text-sm transition ${
                  active
                    ? 'bg-[#121212] text-white border-[#121212]'
                    : 'bg-white text-[#121212] border-neutral-200 hover:border-[#C4A24A]'
                }`}
              >
                {fmtTime(slot.start)}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4) Contact info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1">First Name</label>
          <input className="w-full rounded-xl border border-neutral-200 p-3 focus:ring-2 focus:ring-[#C4A24A]" value={firstName} onChange={e=>setFirstName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1">Last Name</label>
          <input className="w-full rounded-xl border border-neutral-200 p-3 focus:ring-2 focus:ring-[#C4A24A]" value={lastName} onChange={e=>setLastName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1">Email</label>
          <input type="email" className="w-full rounded-xl border border-neutral-200 p-3 focus:ring-2 focus:ring-[#C4A24A]" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#121212] mb-1">Phone</label>
          <input className="w-full rounded-xl border border-neutral-200 p-3 focus:ring-2 focus:ring-[#C4A24A]" value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div className="pt-2">
        <button
          type="submit"
          className="w-full rounded-xl bg-[#121212] text-white py-3 font-medium hover:opacity-95 transition"
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Book Appointment'}
        </button>
      </div>
    </form>
  );
}
