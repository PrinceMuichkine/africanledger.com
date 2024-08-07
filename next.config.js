/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "event-source-polyfill": require.resolve("event-source-polyfill"),
        "eventsource": require.resolve("eventsource")
      };
    }
    return config;
  },
};

module.exports = nextConfig;