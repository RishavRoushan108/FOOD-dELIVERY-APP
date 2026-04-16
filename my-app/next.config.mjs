/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    domains: ["encrypted-tbn0.gstatic.com", "www.shutterstock.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/restaurant",
        permanent: true, // This tells browsers and Vercel to cache the redirect
      },
    ];
  },
};

export default nextConfig;
