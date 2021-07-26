export default {
  stories: [
    '../src/**/*.stories.mdx',
    //  '../src/**/*.stories.@(js|jsx|ts|tsx)' <- Only MDX stories for now. Gotta update babel and types buidls in packages.json if *.tsx enabled.
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-css-modules-preset',
    '@storystore/storybook-variables',
  ],
  webpackFinal: (config: any) => {
    const mdxIndex = config.module.rules.findIndex((x: any) => new RegExp(x.test).test('stories.mdx'))
    if (mdxIndex > -1) {
      const loaderIndex = config.module.rules[mdxIndex].use.findIndex((x: any) => {
        return /babel-loader/.test(x.loader)
      })

      if (loaderIndex > -1) {
        config.module.rules[mdxIndex].use[loaderIndex].options.plugins.push('inline-react-svg')
      }
    }

    return config
  },
}
