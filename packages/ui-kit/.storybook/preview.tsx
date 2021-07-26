import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { themes } from '@storybook/theming'
import { DocsContainer } from '@storybook/addon-docs'
import { useVariables } from '@storystore/storybook-variables/lib'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { auth } from '@storystore/toolbox'
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

type ApolloProviderWrapperProps = {
  uri?: string
  basicAuth?: string
}

const ApolloProviderWrapper: FunctionComponent<ApolloProviderWrapperProps> = ({ children, uri, basicAuth }) => {
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
          credentials: 'include',
          headers: {
            authorization: basicAuth ? auth.getBasicAuthenticationHeader(basicAuth.split(':') as any) : undefined,
          },
        }),
        cache: new InMemoryCache({}),
      }),
    [uri, basicAuth]
  )

  if (!uri) return <MockedProvider>{children}</MockedProvider>

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export const decorators = [
  (Story: FunctionComponent) => {
    const { graphQlEndpoint, graphQlBasicAuth } = useVariables()

    return (
      <ApolloProviderWrapper uri={graphQlEndpoint} basicAuth={graphQlBasicAuth}>
        <UIProvider>
          <Story />
        </UIProvider>
      </ApolloProviderWrapper>
    )
  },
]
