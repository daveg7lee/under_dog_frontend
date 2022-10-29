/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV !== "production" ? `http://localhost:4000/:path*` : `https://underdog-backend.onrender.com/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
