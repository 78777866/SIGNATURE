import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic configuration without experimental features
  outputFileTracingRoot: __dirname,
  
  // Add webpack configuration to handle React 19 compatibility
  webpack: (config, { isServer }) => {
    // Fix for React 19 module resolution issues
    if (!isServer) {
      config.resolve.extensionAlias = {
        ".js": [".js", ".ts"],
        ".jsx": [".jsx", ".tsx"],
      };
    }
    
    return config;
  },
  
  // Configure allowed development origins to fix cross-origin warning
  allowedDevOrigins: ['http://localhost:3000', 'http://172.26.16.1:3000'],
  
  // Configure dev indicators
  devIndicators: {
    position: 'bottom-right',
  },
  
  // Disable React experimental features that might cause issues
  reactStrictMode: true,
};

export default nextConfig;