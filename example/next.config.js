/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 修复 Critical dependency 警告
    config.resolve.fallback = {
      ...config.resolve.fallback,
      util: false,
    };
    return config;
  },
}

module.exports = nextConfig 