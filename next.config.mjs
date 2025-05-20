/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "saferx-api.onrender.com",
      "api.saferx.syndev.us",
      "saferx.syndev.us",
      "syndev.us",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
