// next.config.js
require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  env: {
    DB_URI: process.env.DB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API:
      process.env.NODE_ENV === "production"
        ? "https://xxx.vercel.app/api"
        : "http://localhost:3000/api",
  },
};
