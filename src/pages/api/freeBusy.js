// pages/api/freeBusy.js
import axios from 'axios';

export default async function handler(req, res) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
    });

    const accessToken = tokenRes.data.access_token;

    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    const freeBusyRes = await axios.post(
      'https://www.googleapis.com/calendar/v3/freeBusy',
      {
        timeMin: now.toISOString(),
        timeMax: oneWeekLater.toISOString(),
        timeZone: 'America/Chicago',
        items: [{ id: calendarId }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const busyTimes = freeBusyRes.data.calendars[calendarId].busy;

    const allSlots = [];

    // Define open/close by weekday
    const hoursMap = {
      0: { open: 12, close: 17 }, // Sunday
      1: { open: 10, close: 20 }, // Monday
      2: { open: 10, close: 20 },
      3: { open: 10, close: 20 },
      4: { open: 10, close: 20 },
      5: { open: 10, close: 20 },
      6: { open: 9, close: 18 },  // Saturday
    };

    const roundUp15 = (date) => {
      const minutes = date.getMinutes();
      const offset = 15 - (minutes % 15);
      if (offset < 15) date.setMinutes(minutes + offset);
      date.setSeconds(0, 0);
      return date;
    };

    const padZero = (num) => num.toString().padStart(2, '0');

    for (let d = new Date(now); d <= oneWeekLater; d.setDate(d.getDate() + 1)) {
      const current = new Date(d);
      const day = current.getDay();
      const { open, close } = hoursMap[day];

      for (let hour = open; hour < close; hour++) {
        for (let minute of [0, 15, 30, 45]) {
          const slotStart = new Date(current);
          slotStart.setHours(hour, minute, 0, 0);
          const slotEnd = new Date(slotStart);
          slotEnd.setMinutes(slotEnd.getMinutes() + 15);

          // Skip if slot is past closing or in the past
          const latestStart = new Date(current);
          latestStart.setHours(close, 0, 0, 0);
          latestStart.setMinutes(latestStart.getMinutes() - 15);
          if (slotStart > latestStart || slotStart < now) continue;

          const overlap = busyTimes.some(busy => {
            return new Date(busy.start) < slotEnd && new Date(busy.end) > slotStart;
          });

          if (!overlap) {
            allSlots.push({
              start: slotStart.toISOString(),
              end: slotEnd.toISOString(),
            });
          }
        }
      }
    }

    res.status(200).json({ available: allSlots });
  } catch (err) {
    console.error("❌ ERROR:");
    if (err.response?.data) {
      console.error("Google Response:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(err.message);
    }
    res.status(500).json({ error: 'Failed to fetch calendar availability' });
  }
}
