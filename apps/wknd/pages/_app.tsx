import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { variables, auth } from '@storystore/toolbox'
import { UIProvider } from '@storystore/ui-kit/theme'
import { useMemo } from 'react'
import { wknd } from '@storystore/ui-kit/experiences'

const { App } = wknd.pages

const AppRoot = ({ Component, pageProps }: AppProps) => {
  const AEM_GRAPHQL_URL = variables.get('NEXT_PUBLIC_AEM_GRAPHQL_URL') || process.env['NEXT_PUBLIC_AEM_GRAPHQL_URL']
  const AEM_GRAPHQL_AUTH = variables.get('NEXT_PUBLIC_AEM_GRAPHQL_AUTH') || process.env['NEXT_PUBLIC_AEM_GRAPHQL_AUTH']

  useMemo(() => {
    initApolloClient(
      new ApolloClient({
        connectToDevTools: process.browser,
        queryDeduplication: true,
        ssrMode: false,
        link: new HttpLink({
          uri: new URL(AEM_GRAPHQL_URL).href,
          credentials: 'include',
          headers: {
            authorization: AEM_GRAPHQL_AUTH
              ? auth.getBasicAuthenticationHeader(AEM_GRAPHQL_AUTH.split(':') as any)
              : undefined,
          },
        }),

        cache: new InMemoryCache({}),
      })
    )
  }, [AEM_GRAPHQL_URL])

  const apolloClient = useApollo(useApollo)

  return (
    <ApolloProvider client={apolloClient}>
      <UIProvider>
        <App>
          <Component {...pageProps} />
        </App>
      </UIProvider>
    </ApolloProvider>
  )
}

export default AppRoot
