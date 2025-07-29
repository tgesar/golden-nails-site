import React from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: "Do you accept walk-ins or appointments only?",
      answer:
        "We accept both walk-ins and appointments! However, we recommend booking an appointment to ensure availability, especially during weekends or busy hours.",
    },
    {
      question: "Are taxes included in the prices listed?",
      answer:
        "Taxes are not included in the prices listed. Applicable taxes will be added at checkout.",
    },
    {
      question: "What kind of payment do you accept?",
      answer:
        "We accept cash, debit cards, MasterCard, Visa, and Amex. We do not accept checks or digital payment apps at this time.",
    },
    {
      question: "What happens if I am running late for my appointment?",
      answer:
        "Please call us as soon as possible if you're running late. We hold appointments for 15 minutes. After that, your service may need to be shortened or rescheduled. If you’re over 15 minutes late, the appointment may be considered a 'no-show.'",
    },
    {
      question: "Do you offer group bookings or events?",
      answer:
        "Yes! We welcome group bookings such as bridal parties, birthdays, or special events. Please contact us in advance so we can accommodate your group comfortably.",
    },
    {
      question: "Is tipping required or expected?",
      answer:
        "Tips are not required but are always appreciated by our staff. The standard tipping amount is around 15–20% of your service total. We take venmo, cash,",
    },
    {
      question: "What if I have a special request that's not listed on the service menu?",
      answer:
        "We’d love to help! Feel free to call us or send an email to goldennailsgv@gmail.com with your request. We’ll do our best to accommodate your needs.",
    },
    {
      question: "Do you provide services for children?",
      answer:
        "Yes, we do! Kids are welcome and we offer child-friendly manicure and pedicure services.",
    },
    {
      question: "Can I bring my own nail polish or tools?",
      answer:
        "Yes, you’re welcome to bring your own polish or tools. Just let your technician know at the start of your appointment.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Please notify us at least 24 hours in advance to cancel or reschedule. No-shows or repeated last-minute cancellations may result in a blacklist.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-yellow-500">{faq.question}</h2>
            <p className="text-gray-700 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
