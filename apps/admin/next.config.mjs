/** @type {import('next').NextConfig} */

const hostname = new URL(process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL).hostname;

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname,
      },
    ],
  },
};

export default nextConfig;
