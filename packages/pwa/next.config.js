const withPlugins = require('next-compose-plugins')
const withStoryStore = require('@storystore/ui-kit/nextjs')
const withPWA = require('next-pwa')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = withPlugins([withPWA, withStoryStore], {
  experimental: {
    esmExternals: 'loose',
  },

  assetPrefix: process.env.NEXT_PUBLIC_URL,

  pwa: {
    dest: '.next/static',
    disable: process.env.NODE_ENV === 'development',
    maximumFileSizeToCacheInBytes: 3000000,
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

      /** Asset Manifest */
      {
        source: '/asset-manifest.json',
        destination: '/_next/static/asset-manifest.json',
      },

      /** Proxy AEM GraphQL /__graphql */
      {
        source: '/__graphql/:path*',
        destination: '/api/aem-proxy',
      },

      // Proxy files with extensions
      {
        source: '/content/dam/:site/:locale/adventures/:path*.(.*)',
        destination: '/api/aem-proxy',
      },
      /** Rewrite Adventure Details */
      {
        source: '/content/dam/:site/:locale/adventures/:path*',
        destination: '/adventure',
      },

      /** Proxy AEM Content /content */
      {
        source: '/content/:path*',
        destination: '/api/aem-proxy',
      },
    ]
  },

  webpack: config => {
    config.module.rules = config.module.rules.map(rule => {
      if (!rule.oneOf) return rule

      rule.oneOf = rule.oneOf.map(x => {
        if (x.test && x.test.toString() === '/\\.module\\.css$/') {
          delete x.issuer
          return x
        }

        return x
      })

      return rule
    })

    /**
     * Asset Manifest
     */
    config.plugins.push(
      new WebpackAssetsManifest({
        output: 'static/asset-manifest.json',
        transform: assets => {
          const entrypoints = []
          for (let file in assets) {
            if (assets[file].endsWith('.js') || assets[file].endsWith('.css')) {
              entrypoints.push(assets[file])
            }
          }
          return {
            files: assets,
            entrypoints: entrypoints,
          }
        },
      })
    )

    return config
  },
})
