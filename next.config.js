/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        pathname: '/images/**',
        hostname: '**', // to access all the images
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
