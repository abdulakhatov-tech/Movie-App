/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "image.tmdb.org",
      "rb.gy",
      "avatars.mds.yandex.net",
      "cutewallpaper.org",
    ],
  },
};

module.exports = nextConfig;
