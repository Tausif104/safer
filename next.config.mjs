/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["saferx-api.onrender.com", "api.saferx.syndev.us"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
