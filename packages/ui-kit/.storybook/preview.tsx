import React, { FunctionComponent } from 'react'
import { themes } from '@storybook/theming'
import { DocsContainer } from '@storybook/addon-docs'
import UIProvider from '../src/theme/UIProvider'

// TODO: Moved to App wrapper until Next.js allows for global css import from other files.
import '../src/theme/css/global.css'

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
  (Story: FunctionComponent) => {
    return (
      <UIProvider>
        <Story />
      </UIProvider>
    )
  },
]
