import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import WKNDApp from '@storystore/ui-kit/dist/experiences/wknd/components/App'
import { Dialog, UIKitSettings, useUIKitSettings, useDialog } from '@storystore/ui-kit/components'
import Head from 'next/head'
import NextLink from 'next/link'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/client'
import { getSiteURLFromPath } from '../lib/get-site-path'
import { useTrackers, trackEvent, trackModal } from '../lib/tracker'
import { cookies } from '@storystore/toolbox'
import { useRouter } from 'next/router'

// Global Styles
import '@storystore/ui-kit/dist/theme/css/global.css'

const Link: FunctionComponent<any> = ({ href, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props} />
    </NextLink>
  )
}

const AppRoot = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps)

  const router = useRouter()

  /** Initialize Google Analytics (production only) */
  useTrackers()

  const settings = useUIKitSettings(JSON.parse(cookies.get('STORYSTORE_SETTINGS') || '{}'))

  const settingsDialog = useDialog(false)

  const { model = {} } = pageProps

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=no"
        />
        <meta name="apple-mobile-web-app-title" content={model.page?.siteName || ''} />
        <title>{model.page ? `${model.page.siteName} | ${model.page.title}` : ''}</title>
        <meta name="description" content={model.page?.description || ''} />
        <meta name="keywords" content={model.page?.keywords || ''} />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link rel="shortcut icon" type="image/png" href={getSiteURLFromPath('/favicon.ico')} />
        <link rel="apple-touch-icon" href={getSiteURLFromPath('/icons/apple-touch-icon.png')} />
        <link rel="manifest" href={getSiteURLFromPath('/manifest.webmanifest')} crossOrigin="use-credentials" />

        {/* Google Analytics */}
        <link href="https://www.google-analytics.com" rel="preconnect" crossOrigin="anonymous" />

        {model.page?.colorAccent && <meta name="theme-color" content={model.page.colorAccent} />}

        {model.page && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
              :root {
                background-color: ${model.page.colorBody};
                color: ${model.page.colorOnBody};
              }
            `,
            }}
          />
        )}
      </Head>
      <ApolloProvider client={apolloClient}>
        <UIProvider>
          <WKNDApp pagePath={model.__pagePath} linkRoot={<Link />} {...model.page}>
            <Component {...pageProps} />

            <Dialog closeOnClickOutside {...settingsDialog}>
              <UIKitSettings
                {...settings}
                onSubmit={async (values: any) => {
                  settings.onSubmit(values)
                  cookies.set('STORYSTORE_SETTINGS', JSON.stringify(values), 30)
                  await apolloClient.resetStore()
                  settingsDialog.setOpen(false)
                  router.reload()

                  /** Track changed variables */
                  trackEvent({
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
                  router.reload()

                  /** Track reset variables */
                  trackEvent({
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
