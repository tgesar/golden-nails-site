import React, { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: 'Do you accept walk-ins or appointments only?',
      answer:
        'We accept both walk-ins and appointments! However, we recommend booking an appointment to ensure availability, especially during weekends or busy hours.',
    },
    {
      question: 'Are taxes included in the prices listed?',
      answer:
        'Taxes are included in the prices listed. Prices shown are final.',
    },
    {
      question: 'What kind of payment do you accept?',
      answer:
        'We accept cash, debit cards, MasterCard, Visa, and Amex. We do not accept checks or digital payment apps at this time.',
    },
    {
      question: 'What happens if I am running late for my appointment?',
      answer:
        "Please call us as soon as possible if you're running late. We hold appointments for 15 minutes. After that, your service may need to be shortened or rescheduled. If you’re over 15 minutes late, the appointment may be considered a 'no-show.'",
    },
    {
      question: 'Do you offer group bookings or events?',
      answer:
        'Yes! We welcome group bookings such as bridal parties, birthdays, or special events. Please contact us in advance so we can accommodate your group comfortably.',
    },
    {
      question: 'Is tipping required or expected?',
      answer:
        'Tips are not required but are always appreciated by our staff. The standard tipping amount is around 15–20% of your service total.',
    },
    {
      question: "What if I have a special request that's not listed on the service menu?",
      answer:
        'We’d love to help! Feel free to call us or send an email to goldennailsgv@gmail.com with your request. We’ll do our best to accommodate your needs.',
    },
    {
      question: 'Do you provide services for children?',
      answer:
        'Yes, we do! Kids are welcome and we offer child-friendly manicure and pedicure services.',
    },
    {
      question: 'Can I bring my own nail polish or tools?',
      answer:
        'Yes, you’re welcome to bring your own polish or tools. Just let your technician know at the start of your appointment.',
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        'Please notify us at least 24 hours in advance to cancel or reschedule. No-shows or repeated last-minute cancellations may result in a blacklist.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FAF8F3_0%,#ffffff_100%)]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h1
            className="text-4xl md:text-5xl font-semibold"
            style={{ color: '#C4A24A', fontFamily: 'Playfair Display, serif' }}
          >
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-neutral-700">
            Quick answers to the things we’re asked most.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white/90 backdrop-blur-sm border border-neutral-200 shadow-sm transition hover:shadow-md"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-lg font-semibold" style={{ color: '#C4A24A' }}>
                    {item.question}
                  </span>
                  <svg
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-neutral-800 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-neutral-500 mt-10">
          Still have questions?{' '}
          <a href="/contact" className="underline hover:opacity-80">
            Contact us
          </a>{' '}
          and we’ll be happy to help.
        </p>
      </div>
    </div>
  );
}
