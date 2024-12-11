/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  rewrites: async () => {
    return [
      {
        source: '/result',
        destination: '/quiz/result',
      },
    ]
  }
}

module.exports = nextConfig