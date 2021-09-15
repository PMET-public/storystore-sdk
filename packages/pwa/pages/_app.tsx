import { FunctionComponent, useState, useCallback, useEffect, Fragment } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import WKNDApp from '@storystore/ui-kit/dist/experiences/wknd/components/App'
import Head from 'next/head'
import NextLink from 'next/link'
import { Button, Dialog, UIKitSettings, useUIKitSettings, toast } from '@storystore/ui-kit/components'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { cookies } from '@storystore/toolbox'
import { setContext } from '@apollo/client/link/context'

// Global Styles
import '@storystore/ui-kit/dist/theme/css/global.css'

let env: { uri?: string; basicAuth?: string }

initApolloClient(
  new ApolloClient({
    connectToDevTools: process.browser,
    queryDeduplication: true,
    ssrMode: !process.browser,
    cache: new InMemoryCache({}),
    link: from([
      setContext((_, prev) => {
        env = prev.env
      }),

      new HttpLink({
        uri: '/__graphql',
        fetch: async (uri, options) => {
          try {
            return await fetch(env?.uri || uri, {
              ...options,
              headers: { ...options.headers, Authorization: env?.basicAuth },
            })
          } catch (error) {
            if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
              return new Response(null, { status: 404 })
            }
            return new Response(null, { status: 500 })
          }
        },
      }),
    ]),
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
  const settings = useUIKitSettings()

  const apolloClient = useApollo(pageProps)

  useEffect(() => {
    const cookie = cookies.get('STORYSTORE_SETTINGS')
    if (cookie) {
      settings.setValues(JSON.parse(cookie))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apolloClient, settings.setValues])

  const [openSettings, setOpenSettings] = useState(false)

  const handleSettingsUpdate = useCallback(
    async data => {
      const params = new URLSearchParams(data).toString()
      const { success, errors } = await (await fetch(`/api/check-endpoint?${params}`)).json()

      if (success) {
        cookies.set('STORYSTORE_SETTINGS', JSON.stringify(data), 365)

        settings.setValues(data)
        settings.clearErrors()

        apolloClient.resetStore().catch(() => {})

        setOpenSettings(false)
        toast.success('UIKit settings has been updated.')
      }

      if (errors) {
        settings.setErrors(errors)
      }
    },
    [settings, apolloClient]
  )

  const handleSettingsReset = useCallback(async () => {
    cookies.remove('STORYSTORE_SETTINGS')

    settings.reset()

    apolloClient.resetStore().catch(() => {})

    setOpenSettings(false)
    toast.success('Using UIKit default settings.')
  }, [apolloClient, settings])

  return (
    <Fragment>
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
          <WKNDApp
            linkRoot={<Link />}
            homeLink={<Link href="/" />}
            passportLink={<Link href="/my-passport" />}
            footerMenu={[
              <Link key="home" href="/">
                Home
              </Link>,
              <Link key="adventures" href="/adventures">
                Adventures
              </Link>,
              <Link key="my-trips" href="/my-passport">
                My Passport
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
          </WKNDApp>

          <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
            <UIKitSettings
              onSubmit={handleSettingsUpdate}
              onReset={handleSettingsReset}
              values={settings.values}
              errors={settings.errors}
            />
          </Dialog>
        </UIProvider>
      </ApolloProvider>
    </Fragment>
  )
}

export default AppRoot
