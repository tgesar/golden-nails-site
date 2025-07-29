import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, phone, startDateTime, endDateTime } = req.body;

  if (!firstName || !lastName || !phone || !startDateTime || !endDateTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
  summary: `Appointment: ${firstName} ${lastName}`,
  description: `Phone: ${phone}\nService: ${req.body.service}`,
  start: {
    dateTime: startDateTime,
    timeZone: 'America/Chicago',
  },
  end: {
    dateTime: endDateTime,
    timeZone: 'America/Chicago',
  },
  location: 'Golden Nails, Golden Valley, MN',
  attendees: [{ email: req.body.email }],
};


    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    return res.status(200).json({ message: 'Booking confirmed!' });
  } catch (error) {
    console.error('Create Event Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
