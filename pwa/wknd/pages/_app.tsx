import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { UIProvider } from '@storystore/ui-kit/theme'
import { WKND } from '@storystore/ui-kit/experiences'
import NextLink from 'next/link'

initApolloClient(
  new ApolloClient({
    connectToDevTools: process.browser,
    queryDeduplication: true,
    ssrMode: false,
    link: new HttpLink({
      uri: '/__graphql',
    }),
    cache: new InMemoryCache({}),
  })
)

const Link: FunctionComponent<any> = ({ href, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props} />
    </NextLink>
  )
}

const AppRoot = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <UIProvider>
        <WKND.App linkRoot={<Link />}>
          <Component {...pageProps} />
        </WKND.App>
      </UIProvider>
    </ApolloProvider>
  )
}

export default AppRoot
