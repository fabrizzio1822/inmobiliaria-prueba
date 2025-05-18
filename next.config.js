require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tokkobroker.com',
      },
    ]
  },

};