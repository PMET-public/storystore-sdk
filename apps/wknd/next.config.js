const withTM = require('next-transpile-modules')(['@storystore/ui-kit'])

module.exports = withTM({
  async rewrites() {
    return [
      {
        source: '/content/dam/:pathname*',
        destination: '/api/proxy',
      },
    ]
  },
})
