/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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

console.log("Image domains allowed:", nextConfig.images.domains);

export default nextConfig;
