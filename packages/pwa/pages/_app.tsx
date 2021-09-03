import { FunctionComponent, useMemo, useState, useCallback, useEffect } from 'react'
import App, { AppContext, AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { UIProvider } from '@storystore/ui-kit/theme'
import Head from 'next/head'
import { WKND } from '@storystore/ui-kit/experiences'
import { Button, Dialog, UIKitSettings, useUIKitSettings, toast } from '@storystore/ui-kit/components'
import NextLink from 'next/link'
import '@storystore/ui-kit/dist/theme/css/global.css'
import { cookies } from '@storystore/toolbox'

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

const AppRoot = ({ Component, pageProps, referrer }: AppProps & { referrer: string }) => {
  const apolloClient = useApollo(pageProps)

  const [openSettings, setOpenSettings] = useState(false)

  const settings = useUIKitSettings()

  useEffect(() => {
    const cookie = cookies.get('STORYSTORE_SETTINGS')
    if (cookie) {
      settings.setValues(JSON.parse(cookie))
    }
  }, [settings])

  const handleSettingsUpdate = useCallback(
    async data => {
      const params = new URLSearchParams(data).toString()
      const { success, errors } = await (await fetch(`/api/check-endpoint?${params}`)).json()

      if (success) {
        cookies.set('STORYSTORE_SETTINGS', JSON.stringify(data), 365)
        apolloClient.resetStore()
        settings.setValues(data)
        settings.clearErrors()
        setOpenSettings(false)
        toast.success('UIKit settings has been updated.')
      }

      if (errors) {
        settings.setErrors(errors)
      }
    },
    [apolloClient, settings]
  )

  const handleSettingsReset = useCallback(async () => {
    cookies.remove('STORYSTORE_SETTINGS')
    settings.reset()
    apolloClient.resetStore()
    setOpenSettings(false)
    toast.success('Using UIKit default settings.')
  }, [apolloClient, settings])

  useMemo(() => {
    const uri = referrer ? new URL('/__graphql', referrer).href : '/__graphql'
    apolloClient.setLink(new HttpLink({ uri }))
  }, [apolloClient, referrer])

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
          </WKND.App>

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
    </>
  )
}

AppRoot.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const referrer = appContext.ctx.req?.headers.referer
  return { ...appProps, referrer }
}

export default AppRoot
