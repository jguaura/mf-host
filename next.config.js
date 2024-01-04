/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const remotes = (isServer) => {
   const location = isServer ? 'ssr' : 'chunks';
   const remoteUrl = process.env.REMOTE_URL || 'http://localhost:3001'
   return {
     remote: `remote@${remoteUrl}/_next/static/${location}/remoteEntry.js`,
   };
 }

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        exposes: {},
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true }
        }
      })
    );

    return config;
  }
};

module.exports = nextConfig
