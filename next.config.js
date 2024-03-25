/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa");
const path = require("path");
const isProd = process.env.NODE_ENV === "production";

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    disable: !isProd,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias["@"] = path.join(__dirname, "src");

    return config;
  },
});
