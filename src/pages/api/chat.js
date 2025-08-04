// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body || {};
  if (!Array.isArray(messages)) return res.status(400).json({ error: 'Invalid payload' });

  // Tight system prompt with your site facts so answers stay accurate.
  const siteContext = `
You are the helpful assistant for Golden Nails (Golden Valley, MN).
Answer briefly and clearly. If asked to book, guide the user to the Booking page at /booking.
If asked anything unrelated to this salon, politely decline and bring the user back to salon info.

Business info:
- Address: 7752 Hwy 55, Golden Valley, MN 55427
- Email: goldennailsgv@gmail.com
- Phone: (763) 746-4049
- Facebook: https://www.facebook.com/golden.nails.96
- Hours (America/Chicago):
  Mon–Fri: 10 AM–8 PM
  Sat: 9 AM–6 PM
  Sun: 12 PM–5 PM

Services & prices (exact):
Manicure/Pedicure
- Basic Manicure $30
- Basic Manicure Gel $40
- Express Pedicure Gel $50

Waxing
- Eyebrows $15+
- Eyebrows & Lip $25+
- Chin $15+
- Underarms $30+
- Face Wax $40+

Add-Ons
- Color $50+ (Dip Powder)
- French $55+ (Dip Powder)
- Gel Nail Polish Change $25+
- Gel Toe Polish Change $35+
- Regular Nail Polish Change $12+
- Regular Toe Polish Change $20+
- Nail Repair $5+
- Nail Design $5+
- Callus Removal $5
- Nail Removal $15+

Full Set
- Gel Powder $45
- Ombre $70
- Liquid Gel $55
- Pink & White Powder $70
- Pink & White Liquid $80
- (+ Gel Polish $15+)

Fill In
- Gel Powder $35
- Liquid Gel $45
- Pink & White Powder $60
- Ombre $60
- Pink & White Liquid $75
`;

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: siteContext },
          ...messages.map(m => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.2,
        max_tokens: 400,
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(500).json({ error: 'No reply from model' });
    }
    return res.status(200).json({ reply });
  } catch (e) {
    console.error('Chat API error:', e);
    return res.status(500).json({ error: 'Chat backend error' });
  }
}
