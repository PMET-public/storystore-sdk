const withTM = require('next-transpile-modules')(['@storystore/ui-kit'])

module.exports = withTM({
  //...
  async rewrites() {
    return [
      {
        source: '/content',
        destination: '/api/content',
      },
    ]
  },
})
