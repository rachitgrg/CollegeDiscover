/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs'],
  },
  images: {
    domains: ['ui-avatars.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
