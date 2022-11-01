/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net']
  },
  compiler: {
    styledComponents: true,
  }
}

module.exports = nextConfig
