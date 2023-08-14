/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler:{
    styledComponents: true,
    displayName:  false,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
