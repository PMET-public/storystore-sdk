const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')

module.exports = function withStoryStore(nextConfig = {}) {
  return {
    ...nextConfig,

    async rewrites() {
      return [
        ...(nextConfig.rewrites ? await nextConfig.rewrites() : []),
        {
          source: '/__assets/:site/:pathname*',
          destination: '/_next/static/__assets/:site/:pathname*',
        },
      ]
    },

    webpack: (config, options) => {
      config.plugins
        .push
        // new CopyWebpackPlugin({
        //   patterns: [
        //     {
        //       from: path.resolve(require.resolve('@storystore/ui-kit/dist/lib'), '../../experiences/**/assets/*'),
        //       to({ absoluteFilename }) {
        //         const site = absoluteFilename.match(/experiences\/(.*)\/assets/)[1]
        //         return `static/__assets/${site}/[name][ext]`
        //       },
        //     },
        //   ],
        // })
        ()

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}
