/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "cdn.jsdelivr.net"],
  },
  // experimental: {
  //   ppr: true,
  // },
};

export default nextConfig;
