import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { themes } from '@storybook/theming'
import { DocsContainer } from '@storybook/addon-docs'
import { useVariables } from '@storystore/storybook-variables/lib'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
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
          uri: '/__graphql',
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
    const {
      AEMEndpoint = process.env.AEM_HOST,
      AEMBasicAuth = process.env.AEM_AUTH,
      graphQlPath = process.env.AEM_GRAPHQL_PATH,
    } = useVariables()

    const uri = new URL(graphQlPath, AEMEndpoint).href

    return (
      <ApolloProviderWrapper uri={uri} basicAuth={AEMBasicAuth}>
        <UIProvider>
          <Story />
        </UIProvider>
      </ApolloProviderWrapper>
    )
  },
]
