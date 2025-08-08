// src/pages/api/contact.js
import nodemailer from 'nodemailer';

function required(name, v) {
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const transporter = nodemailer.createTransport({
  host: required('SMTP_HOST', process.env.SMTP_HOST),
  port: Number(required('SMTP_PORT', process.env.SMTP_PORT)),
  secure: String(process.env.SMTP_PORT) === '465', // true for 465, false for 587/25/2525
  auth: {
    user: required('SMTP_USER', process.env.SMTP_USER),
    pass: required('SMTP_PASS', process.env.SMTP_PASS),
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, email, subject, message } = req.body || {};

  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please complete all fields.' });
  }

  // Compose exactly as you requested
  const textBody =
    `${firstName} ${lastName}\n` +
    `${email}\n` +
    `${subject}\n\n` +
    `${message}`;

  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p><strong>${firstName} ${lastName}</strong></p>
      <p>${email}</p>
      <p>${subject}</p>
      <br/>
      <pre style="white-space:pre-wrap;margin:0">${message}</pre>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Golden Nails Website" <${process.env.SMTP_USER}>`, // sender is your SMTP user
      to: process.env.SMTP_USER, // send to yourself
      subject: 'CONTACT REQUEST',
      text: textBody,
      html: htmlBody,
      replyTo: email, // so you can reply directly to the customer
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SMTP send error:', err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
}
