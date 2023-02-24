/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@popperjs/core"]);
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/cms-thesis",
};

module.exports = withTM(nextConfig);
