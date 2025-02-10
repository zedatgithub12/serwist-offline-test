import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  swUrl: "/sw.js",
  reloadOnOnline: true,
});

export default withSerwist({
  webpack: (config) => {
    return config;
  },

  reactStrictMode: true,
  swcMinify: true,
});
