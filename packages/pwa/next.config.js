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

  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: '*' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },
    ]
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

      /** Proxy AEM GraphQL */
      {
        source: '/api/aem/graphql/:path*',
        destination: '/api/aem',
      },

      /** Proxy to AEM /content */
      {
        source: '/content/:path*.(model.json|jpg|jpeg|gif|png|pdf|js|json|css)',
        destination: '/api/aem',
      },
      {
        source: '/etc.clientlibs/:path*',
        destination: '/api/aem',
      },

      /** Proxy Commerce */
      {
        source: '/api/commerce/graphql/:path*',
        destination: '/api/commerce',
      },

      /** Pages */
      {
        source: '/_author',
        destination: '/_page',
      },
      {
        source: '/:path*',
        destination: '/_page',
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
