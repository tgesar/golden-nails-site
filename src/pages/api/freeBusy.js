import axios from 'axios';
import { DateTime, Interval } from 'luxon';

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

    const now = DateTime.now().setZone('America/Chicago');
    const oneWeekLater = now.plus({ days: 7 });

    const freeBusyRes = await axios.post(
      'https://www.googleapis.com/calendar/v3/freeBusy',
      {
        timeMin: now.toISO(),
        timeMax: oneWeekLater.toISO(),
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

    const hoursMap = {
      0: { open: 12, close: 17 }, // Sunday
      1: { open: 10, close: 20 },
      2: { open: 10, close: 20 },
      3: { open: 10, close: 20 },
      4: { open: 10, close: 20 },
      5: { open: 10, close: 20 },
      6: { open: 9, close: 18 },  // Saturday
    };

    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const date = now.plus({ days: i });
      const day = date.weekday % 7; // luxon: Sunday = 7

      const { open, close } = hoursMap[day];
      const openTime = date.set({ hour: open, minute: 0, second: 0, millisecond: 0 });
      const closeTime = date.set({ hour: close, minute: 0, second: 0, millisecond: 0 });

      for (
        let slot = openTime;
        slot < closeTime.minus({ minutes: 15 });
        slot = slot.plus({ minutes: 15 })
      ) {
        const slotEnd = slot.plus({ minutes: 15 });

        if (slot < now) continue;

        const overlap = busyTimes.some((busy) => {
          const busyStart = DateTime.fromISO(busy.start);
          const busyEnd = DateTime.fromISO(busy.end);
          return Interval.fromDateTimes(busyStart, busyEnd).overlaps(
            Interval.fromDateTimes(slot, slotEnd)
          );
        });

        if (!overlap) {
          allSlots.push({
            start: slot.toISO(),
            end: slotEnd.toISO(),
          });
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
