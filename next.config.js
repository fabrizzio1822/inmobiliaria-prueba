require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'static.tokkobroker.com',
        // Opcional: puedes especificar el puerto si es necesario
        // port: '',
        // Opcional: puedes especificar el pathname si es necesario con wildcard
        // pathname: '/pictures/**',
      },
    ]
  },
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
        ? "https://www.marialaurabobadilla.com.ar/api"
        : "http://localhost:3000/api",
  },
};