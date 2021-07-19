import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { themes } from '@storybook/theming'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import UIProvider from '../src/theme/UIProvider'
import { useVariables } from '@storystore/storybook-variables/lib'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'

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

type ApolloProviderWrapperProps = {
  uri?: string
}

const ApolloProviderWrapper: FunctionComponent<ApolloProviderWrapperProps> = ({ children, uri }) => {
  useEffect(() => {
    /** Enable Apollo Client Dev Chrome Ext from Story iframes */
    if (window.parent !== window) {
      // @ts-ignore
      window.parent.__APOLLO_CLIENT__ = window.__APOLLO_CLIENT__
    }
  }, [])

  const client = useMemo(
    () =>
      uri &&
      new ApolloClient({
        connectToDevTools: true,
        queryDeduplication: true,
        ssrMode: false,
        link: new HttpLink({
          uri,
          // credentials: 'include',
        }),
        cache: new InMemoryCache({}),
      }),
    [uri]
  )

  if (!uri) return <MockedProvider>{children}</MockedProvider>

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export const decorators = [
  (Story: FunctionComponent) => {
    const variables = useVariables()

    return (
      <ApolloProviderWrapper uri={variables?.graphQlEndpoint}>
        <UIProvider>
          <Story />
        </UIProvider>
      </ApolloProviderWrapper>
    )
  },
]
