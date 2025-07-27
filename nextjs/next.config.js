// const { default: next } = require('next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.usnews.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig