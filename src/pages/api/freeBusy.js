// /src/pages/api/freeBusy.js
import axios from 'axios';

const TZ = 'America/Chicago';
const STEP_MIN = 15;                 // 15-minute increments
const SERVICE_MIN = 30;              // assume 30-min appointment
const LAST_START_BEFORE_CLOSE = 30;  // last start = 30 min before close

// Reusable formatter (used only a few times)
const FMT = new Intl.DateTimeFormat('en-US', {
  timeZone: TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

// Convert a UTC Date -> Chicago parts
function partsInChicago(d) {
  const p = FMT.formatToParts(d).reduce((acc, x) => ((acc[x.type] = x.value), acc), {});
  return {
    y: Number(p.year),
    m: Number(p.month) - 1, // zero-based month
    d: Number(p.day),
    h: Number(p.hour),
    min: Number(p.minute),
  };
}

// Produce a UTC Date that corresponds to a given Chicago wall-time (y,m,d,h,min)
function chicagoWallTimeToUTC(y, m, d, h = 0, min = 0) {
  // Start with a UTC moment at those components
  const approxUTC = new Date(Date.UTC(y, m, d, h, min, 0, 0));
  // What Chicago wall-time does that represent?
  const asChicago = partsInChicago(approxUTC);
  // Adjust by the difference to land on the requested wall-time
  const targetUTC = Date.UTC(y, m, d, h, min);
  const approxAsUTC = Date.UTC(asChicago.y, asChicago.m, asChicago.d, asChicago.h, asChicago.min);
  const diff = targetUTC - approxAsUTC; // in ms
  return new Date(approxUTC.getTime() + diff);
}

// Build a UTC Date that is "Chicago midnight" for the given day
function chicagoMidnightUTC(y, m, d) {
  return chicagoWallTimeToUTC(y, m, d, 0, 0);
}

// Hours map (24h clock, Chicago local)
const HOURS = {
  0: { open: 12, close: 17 }, // Sun: 12:00–17:00  => last start 16:30
  1: { open: 10, close: 20 }, // Mon: 10:00–20:00  => last start 19:30
  2: { open: 10, close: 20 }, // Tue
  3: { open: 10, close: 20 }, // Wed
  4: { open: 10, close: 20 }, // Thu
  5: { open: 10, close: 20 }, // Fri
  6: { open: 9,  close: 18 }, // Sat:  9:00–18:00  => last start 17:30
};

export default async function handler(req, res) {
  const calendarId   = process.env.GOOGLE_CALENDAR_ID;
  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  try {
    // 1) Exchange refresh token for access token
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
    });
    const accessToken = tokenRes.data.access_token;

    // 2) Define 'now' in Chicago once
    const now = new Date();
    const { y, m, d, h, min } = partsInChicago(now);
    const nowChicagoUTC = chicagoWallTimeToUTC(y, m, d, h, min);

    // Booking window: 14 days ahead
    const windowEnd = new Date(nowChicagoUTC);
    windowEnd.setDate(windowEnd.getDate() + 14);

    // 3) Pull busy blocks once
    const fb = await axios.post(
      'https://www.googleapis.com/calendar/v3/freeBusy',
      {
        timeMin: nowChicagoUTC.toISOString(),
        timeMax: windowEnd.toISOString(),
        timeZone: TZ,
        items: [{ id: calendarId }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const rawBusy = fb.data.calendars?.[calendarId]?.busy || [];

    // Parse to ms for quick comparisons and bucket by day (YYYY-MM-DD Chicago)
    const busyByDay = Object.create(null);

    for (const b of rawBusy) {
      const bStart = new Date(b.start).getTime();
      const bEnd   = new Date(b.end).getTime();

      // figure out which Chicago day(s) this covers — we’ll bucket by each day it touches
      let cursor = new Date(b.start);
      while (cursor.getTime() < bEnd) {
        const p = partsInChicago(cursor);
        const key = `${p.y}-${String(p.m + 1).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
        (busyByDay[key] ||= []).push([bStart, bEnd]);
        cursor.setUTCDate(cursor.getUTCDate() + 1);
        cursor.setUTCHours(0, 0, 0, 0);
      }
    }

    // 4) Generate slots quickly: per-day build a Chicago midnight UTC baseline, then add minutes
    const startOfTodayUTC = chicagoMidnightUTC(y, m, d);
    const results = [];
    for (let i = 0; i <= 14; i++) {
      const dayBaseUTC = new Date(startOfTodayUTC.getTime() + i * 86400000); // add whole days in UTC
      const dayParts = partsInChicago(dayBaseUTC);
      const dow = new Date(dayBaseUTC).getDay();
      const hours = HOURS[dow];
      if (!hours) continue;

      const { open, close } = hours;
      const lastStartMinutes = close * 60 - LAST_START_BEFORE_CLOSE;

      // Busy intervals for this Chicago date
      const key = `${dayParts.y}-${String(dayParts.m + 1).padStart(2, '0')}-${String(dayParts.d).padStart(2, '0')}`;
      const dayBusy = busyByDay[key] || [];

      // Iterate minute offsets once; no Intl inside loop
      for (let mins = open * 60; mins <= lastStartMinutes; mins += STEP_MIN) {
        const startUTC = new Date(dayBaseUTC.getTime() + mins * 60000);
        if (startUTC <= nowChicagoUTC) continue;

        const endUTC = new Date(startUTC.getTime() + SERVICE_MIN * 60000);

        // overlap check
        let clash = false;
        for (let j = 0; j < dayBusy.length; j++) {
          const [bStart, bEnd] = dayBusy[j];
          if (bStart < endUTC.getTime() && bEnd > startUTC.getTime()) {
            clash = true;
            break;
          }
        }
        if (clash) continue;

        results.push({ start: startUTC.toISOString(), end: endUTC.toISOString() });
      }
    }

    res.status(200).json({ available: results });
  } catch (err) {
    console.error('freeBusy error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch calendar availability' });
  }
}
