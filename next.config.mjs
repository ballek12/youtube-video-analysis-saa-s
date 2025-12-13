/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Enable strict error reporting
  reactStrictMode: true,
  // Disable experimental features that might hide errors
  experimental: {
    optimizePackageImports: ["@radix-ui"],
  },
}

export default nextConfig
