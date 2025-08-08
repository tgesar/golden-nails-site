import { useState } from 'react';
import {
  FaEnvelope, FaPhoneAlt, FaFacebookF, FaMapMarkerAlt, FaClock,
} from 'react-icons/fa';

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });

    if (!form.firstName || !form.lastName || !form.email || !form.subject || !form.message) {
      setStatus({ type: 'error', msg: 'Please complete all fields.' });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Thanks! Your message has been sent.' });
        setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* soft background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FAF8F3_0%,#ffffff_100%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h1
            className="text-4xl md:text-5xl font-semibold"
            style={{ color: '#C4A24A', fontFamily: 'Playfair Display, serif' }}
          >
            Contact Us
          </h1>
          <p className="mt-3 text-neutral-700">
            Have a question or special request? Send us a message or reach us directly.
          </p>
        </div>

        {/* 2-column: form + info card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-3xl shadow-sm p-6 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4A24A]"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4A24A]"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4A24A]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4A24A]"
                placeholder="Booking question, special request, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4A24A]"
                placeholder="Write your message here..."
              />
            </div>

            {status.msg && (
              <div
                className={`rounded-xl px-4 py-3 text-sm ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#121212] text-white py-3 font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          {/* INFO CARD */}
          <div className="bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-3xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Contact Details</h2>
            <div className="space-y-4 text-neutral-800">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-orange-600" />
                <span>goldennailsgv@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-600" />
                <span>(763) 746-4049</span>
              </div>
              <a
                href="https://www.facebook.com/golden.nails.96"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:underline"
              >
                <FaFacebookF className="text-orange-600" />
                <span>Facebook Page</span>
              </a>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-600" />
                <span>7752 Hwy 55, Golden Valley, MN 55427</span>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="text-orange-600 mt-1" />
                <div className="space-y-1">
                  <div>Mon–Fri: 10 AM–8 PM</div>
                  <div>Sat: 9 AM–6 PM</div>
                  <div>Sun: 12 PM–5 PM</div>
                </div>
              </div>
            </div>

            {/* Optional map embed — remove if you don’t want it */}
            <div className="mt-6">
              <iframe
                title="Golden Nails Map"
                className="w-full h-56 rounded-xl border border-neutral-200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=7752%20Hwy%2055,%20Golden%20Valley,%20MN%2055427&output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
