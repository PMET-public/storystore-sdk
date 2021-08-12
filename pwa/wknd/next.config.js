const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['@storystore/ui-kit'])
const withStoryStore = require('@storystore/ui-kit/nextjs')
const withPWA = require('next-pwa')
const { WebpackOpenBrowser } = require('webpack-open-browser')

module.exports = withPlugins([withPWA, withTM, withStoryStore], {
  experimental: {
    esmExternals: 'loose',
  },

  pwa: {
    dest: '.next/static',
    disable: process.env.NODE_ENV === 'development',
  },

  async rewrites() {
    return [
      /** Service Worker (Workbox) */
      {
        source: '/sw.js',
        destination: '/_next/static/sw.js',
      },
      {
        source: '/workbox-:hash.js',
        destination: '/_next/static/workbox-:hash.js',
      },
      /** Proxy to AEM. Images, etc */
      {
        source: '/__aem/:pathname*',
        destination: '/api/__aem',
      },
      {
        source: '/__graphql/:pathname*',
        destination: '/api/__graphql',
      },
      /** Adventure */
      {
        source: '/content/dam/wknd/:locale/adventures/:pathname*',
        destination: '/adventure',
      },
    ]
  },

  webpack: config => {
    config.plugins = config.plugins || []

    if (process.env.NODE_ENV === 'development') {
      config.plugins.push(new WebpackOpenBrowser({ url: `http://localhost:${process.env.PORT || 3000}` }))
    }
    return config
  },
})
