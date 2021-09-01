import { FunctionComponent, useMemo, useState } from 'react'
import App, { AppContext, AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { UIProvider } from '@storystore/ui-kit/theme'
import Head from 'next/head'
import { WKND } from '@storystore/ui-kit/experiences'
import { Button, SettingsDialog } from '@storystore/ui-kit/components'
import NextLink from 'next/link'
import '@storystore/ui-kit/dist/theme/css/global.css'

initApolloClient(
  new ApolloClient({
    connectToDevTools: process.browser,
    queryDeduplication: true,
    ssrMode: !process.browser,
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

const AppRoot = ({ Component, pageProps, uri, settings }: AppProps & { uri: string; settings: any }) => {
  const [openSettings, setOpenSettings] = useState(false)

  const apolloClient = useApollo(pageProps)

  useMemo(() => {
    apolloClient.setLink(new HttpLink({ uri }))
  }, [apolloClient, uri])

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

        <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" crossOrigin="use-credentials" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <UIProvider>
          <WKND.App
            linkRoot={<Link />}
            footerMenu={[
              <Link key="home" href="/">
                Home
              </Link>,
              <Link key="Adventures" href="/adventures">
                Adventures
              </Link>,
              <Button
                key="settings"
                variant="text"
                transparent
                onClick={() => setOpenSettings(true)}
                style={{ color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', padding: 0, height: '1em' }}
              >
                UIKit Settings
              </Button>,
            ]}
          >
            <Component {...pageProps} />
          </WKND.App>

          <SettingsDialog
            open={openSettings}
            onClose={setOpenSettings}
            onSubmit={() => {
              setOpenSettings(false)
              apolloClient.resetStore()
            }}
            onReset={() => {
              setOpenSettings(false)
              apolloClient.resetStore()
            }}
            {...settings}
          />
        </UIProvider>
      </ApolloProvider>
    </>
  )
}

AppRoot.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const referrer = appContext.ctx.req?.headers.referer
  const uri = referrer ? new URL('/__graphql', referrer).href : '/__graphql'

  return { ...appProps, uri }
}

export default AppRoot
