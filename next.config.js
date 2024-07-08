// next.config.js
require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  env: {
    DB_URI: process.env.DB_URI,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API:
      process.env.NODE_ENV === "production"
        ? "https://inmobiliaria-prueba-ixyyelutt-fabrizzio1822s-projects.vercel.app/api"
        : "http://localhost:3000/api",
  },
};
