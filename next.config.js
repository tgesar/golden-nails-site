/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    domains: [], // Add domains here if you host images externally
  },
};

module.exports = nextConfig;
