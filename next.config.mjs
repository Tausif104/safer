/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "saferx-api.onrender.com",
      "api.saferx.syndev.us",
      "saferx.syndev.us",
      "syndev.us",
      "api.saferx.co.uk",
      "saferx.co.uk",
      "saferx.blob.core.windows.net",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
