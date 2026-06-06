/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs'],
  },
  images: {
    domains: ['ui-avatars.com', 'lh3.googleusercontent.com'],
  },
  eslint: {
    // ESLint is run separately in CI; skip during `next build` to avoid
    // Vercel build failures caused by missing eslint peer deps.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type-checking is done locally; skip in production build for speed.
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
