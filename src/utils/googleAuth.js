import { google } from 'googleapis';

export const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL + '/api/oauth2callback'
);

// Use the stored refresh token to get a valid access token
auth.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const calendar = google.calendar({ version: 'v3', auth });
