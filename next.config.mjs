/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saferx-api.onrender.com",
        port: "",
        pathname: "/public/img/**",
      },
      {
        protocol: "https",
        hostname: "api.saferx.syndev.us",
        port: "",
        pathname: "/public/img/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
