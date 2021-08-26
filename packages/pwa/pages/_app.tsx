import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { UIProvider } from '@storystore/ui-kit/theme'
import Head from 'next/head'
import { WKND } from '@storystore/ui-kit/experiences'
import NextLink from 'next/link'
import '@storystore/ui-kit/dist/theme/css/global.css'

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
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#222222" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <meta name="apple-mobile-web-app-title" content="WKND Adventures" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" crossOrigin="use-credentials" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <UIProvider>
          <WKND.App linkRoot={<Link />}>
            <Component {...pageProps} />
          </WKND.App>
        </UIProvider>
      </ApolloProvider>
    </>
  )
}

export default AppRoot
