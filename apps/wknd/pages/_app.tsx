import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { UIProvider } from '@storystore/ui-kit/theme'

initApolloClient(
  new ApolloClient({
    connectToDevTools: process.browser,
    queryDeduplication: true,
    ssrMode: false,
    link: new HttpLink({
      uri: '/content',
      credentials: 'include',
    }),
    cache: new InMemoryCache({}),
  })
)

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(useApollo)

  return (
    <ApolloProvider client={apolloClient}>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </ApolloProvider>
  )
}

export default App
