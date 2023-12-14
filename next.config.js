/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'rc-util',
    'rc-table',
    '@ant-design',
    'kitchen-flow-editor',
    '@ant-design/pro-editor',
    'zustand', 'leva', 'antd',
    'rc-pagination',
    'rc-picker'
  ],
  images: {
    domains: ['d38hkcprerswq9.cloudfront.net'],
  },
  eslint: {
    
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
