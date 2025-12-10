/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Only ignore build errors in development, never in production
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  images: {
    unoptimized: true,
  },
  // Enable strict error reporting
  reactStrictMode: true,
  // Disable experimental features that might hide errors
  experimental: {
    optimizePackageImports: ['@radix-ui'],
  },
}

export default nextConfig
