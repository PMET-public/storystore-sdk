import { themes } from '@storybook/theming'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import UIProvider from '../src/theme/UIProvider'

export const parameters = {
  docs: {
    theme: themes.dark,
    container: ({ children, context }) => (
      <DocsContainer context={context}>
        <UIProvider>{children}</UIProvider>
      </DocsContainer>
    ),
  },

  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },

  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story: any) => (
    <UIProvider>
      <Story />
    </UIProvider>
  ),
]
