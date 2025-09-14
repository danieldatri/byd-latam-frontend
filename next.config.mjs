/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/news', destination: '/articles', permanent: true },
      { source: '/news/:path*', destination: '/articles/:path*', permanent: true },
      { source: '/article/:slug', destination: '/articles/:slug', permanent: true },
    ]
  },
}

export default nextConfig
