/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
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