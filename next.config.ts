import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // This applies to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Clacks-Overhead',
            value: 'GNU Cassian Andor'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
