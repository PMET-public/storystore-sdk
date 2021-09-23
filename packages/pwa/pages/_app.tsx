import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import WKNDApp from '@storystore/ui-kit/dist/experiences/wknd/components/App'
import Head from 'next/head'
import NextLink from 'next/link'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { getSiteURLFromPath } from '../lib/get-site-path'

// Global Styles
import '@storystore/ui-kit/dist/theme/css/global.css'

initApolloClient(
  new ApolloClient({
    connectToDevTools: process.browser,
    queryDeduplication: true,
    ssrMode: !process.browser,
    cache: new InMemoryCache({}),
    link: new HttpLink({
      uri: getSiteURLFromPath('/__graphql'),
    }),
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
        <meta name="theme-color" content="#212121" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <meta name="apple-mobile-web-app-title" content="WKND Adventures" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        <link rel="shortcut icon" type="image/png" href={getSiteURLFromPath('/favicon.ico')} />
        <link rel="apple-touch-icon" href={getSiteURLFromPath('/icons/apple-touch-icon.png')} />
        <link rel="manifest" href={getSiteURLFromPath('/manifest.webmanifest')} crossOrigin="use-credentials" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <UIProvider>
          <WKNDApp
            linkRoot={<Link />}
            homeLink={<Link href="/" />}
            passportLink={<Link href={getSiteURLFromPath('/my-passport/')} />}
            footerMenu={[
              <Link key="home" href={getSiteURLFromPath('/')}>
                Home
              </Link>,
              <Link key="adventures" href={getSiteURLFromPath('/adventures/')}>
                Adventures
              </Link>,
              <Link key="my-trips" href={getSiteURLFromPath('/my-passport/')}>
                My Passport
              </Link>,
            ]}
          >
            <Component {...pageProps} />
          </WKNDApp>
        </UIProvider>
      </ApolloProvider>
    </>
  )
}

export default AppRoot
