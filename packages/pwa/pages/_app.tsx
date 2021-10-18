import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import WKNDApp from '@storystore/ui-kit/dist/experiences/wknd/components/App'
import { Dialog, UIKitSettings, useUIKitSettings, useDialog, Button } from '@storystore/ui-kit/components'
import Head from 'next/head'
import NextLink from 'next/link'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { getSiteURLFromPath } from '../lib/get-site-path'
import { cookies } from '@storystore/toolbox'
import { useInitGoogleAnalytics, googleAnalytics } from '../hooks/useGoogleAnalytics'

// Icon
import TerminalIcon from 'remixicon-react/TerminalBoxFillIcon'

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
      credentials: 'same-origin',
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
  /** Initialize Google Analytics (production only) */
  useInitGoogleAnalytics(process.env.NODE_ENV === 'development' ? null : process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)

  const apolloClient = useApollo(pageProps)

  const settings = useUIKitSettings(JSON.parse(cookies.get('STORYSTORE_SETTINGS') || '{}'))

  const settingsDialog = useDialog(false)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#ecd96f" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <meta name="apple-mobile-web-app-title" content="WKND Adventures" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link rel="shortcut icon" type="image/png" href={getSiteURLFromPath('/favicon.ico')} />
        <link rel="apple-touch-icon" href={getSiteURLFromPath('/icons/apple-touch-icon.png')} />
        <link rel="manifest" href={getSiteURLFromPath('/manifest.webmanifest')} crossOrigin="use-credentials" />

        {/* Google Analytics */}
        <link href="https://www.google-analytics.com" rel="preconnect" crossOrigin="anonymous" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <UIProvider>
          <WKNDApp
            linkRoot={<Link />}
            homeLink={<Link href="/" />}
            passportLink={<Link href={getSiteURLFromPath('/my-passport')} />}
            footerMenu={[
              <Link key="home" href={getSiteURLFromPath('/')}>
                Home
              </Link>,
              <Link key="adventures" href={getSiteURLFromPath('/adventures')}>
                Adventures
              </Link>,
              <Link key="my-trips" href={getSiteURLFromPath('/my-passport')}>
                My Passport
              </Link>,
              <Button
                key="settings"
                icon={<TerminalIcon aria-label="StoryStore SDK" />}
                onClick={() => {
                  settingsDialog.setOpen(true)

                  /** Track Settings being used */
                  googleAnalytics.modalview('aem-environment-modal')
                }}
              >
                AEM Environment
              </Button>,
            ]}
          >
            <Component {...pageProps} />

            <Dialog closeOnClickOutside {...settingsDialog}>
              <UIKitSettings
                {...settings}
                onSubmit={async (values: any) => {
                  settings.onSubmit(values)
                  cookies.set('STORYSTORE_SETTINGS', JSON.stringify(values), 30)
                  await apolloClient.resetStore()
                  settingsDialog.setOpen(false)

                  /** Track changed variables */
                  googleAnalytics.event({
                    category: 'AEM Environment',
                    action: 'Changed',
                    label: values.AEM_HOST,
                  })
                }}
                onReset={async () => {
                  settings.onReset()
                  cookies.remove('STORYSTORE_SETTINGS')
                  await apolloClient.resetStore()
                  settingsDialog.setOpen(false)

                  /** Track reset variables */
                  googleAnalytics.event({
                    category: 'AEM Environment',
                    action: 'Reset',
                  })
                }}
              />
            </Dialog>
          </WKNDApp>
        </UIProvider>
      </ApolloProvider>
    </>
  )
}

export default AppRoot
