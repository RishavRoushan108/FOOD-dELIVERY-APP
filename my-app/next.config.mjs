/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    domains: ["encrypted-tbn0.gstatic.com", "www.shutterstock.com"],
  },
};

export default nextConfig;
