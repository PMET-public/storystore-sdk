export default {
  stories: [
    '../src/**/*.stories.mdx',
    //  '../src/**/*.stories.@(js|jsx|ts|tsx)' <- Only MDX stories for now. Gotta update babel and types buidls in packages.json if *.tsx enabled.
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-css-modules-preset'],
}
