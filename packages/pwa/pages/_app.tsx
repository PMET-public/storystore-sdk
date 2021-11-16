import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import WKNDApp from '@storystore/ui-kit/dist/experiences/wknd/components/App'
import { Dialog, UIKitSettings, useUIKitSettings, useDialog, Button } from '@storystore/ui-kit/components'
import Head from 'next/head'
import NextLink from 'next/link'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, gql, useQuery, makeVar } from '@apollo/client'
import { initApolloClient, useApollo } from '@storystore/next-apollo'
import { getSiteURLFromPath } from '../lib/get-site-path'
import { useTrackers, trackEvent, trackModal } from '../lib/tracker'
import { cookies } from '@storystore/toolbox'
import { useRouter } from 'next/router'

// Global Styles
import '@storystore/ui-kit/dist/theme/css/global.css'

export const themeVar = makeVar<any>({})

initApolloClient(
  new ApolloClient({
    connectToDevTools: process.browser,
    queryDeduplication: true,
    ssrMode: !process.browser,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            theme: {
              read: () => themeVar(),
            },
          },
        },
      },
    }),
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

const APP_QUERY = gql`
  query APP_QUERY {
    theme @client {
      logoFile
      logoText
      colorBody
      colorOnBody
      colorSurface
      colorOnSurface
      colorAccent
      colorOnAccent
      colorPrimary
      colorOnPrimary
      colorSecondary
      colorOnSecondary
    }
  }
`

const App = ({ children, apolloClient }) => {
  const { data } = useQuery(APP_QUERY)

  const router = useRouter()

  /** Initialize Google Analytics (production only) */
  useTrackers()

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

        {data?.theme?.colorAccent && <meta name="theme-color" content={data.theme.colorAccent} />}

        {data?.theme && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
              :root {
                --ui-color-body: ${data.theme.colorBody};
                --ui-color-on-body: ${data.theme.colorOnBody};
              }
            `,
            }}
          />
        )}
      </Head>

      <UIProvider>
        <WKNDApp
          logo={{ src: data?.theme?.logoFile, alt: data?.theme.logoText }}
          linkRoot={<Link />}
          passportLink={<Link href={getSiteURLFromPath('/my-passport')} />}
          footerMenu={[
            <Button
              key="settings"
              onClick={() => {
                settingsDialog.setOpen(true)

                /** Track Settings being used */
                trackModal('aem-environment-modal')
              }}
            >
              AEM Environment
            </Button>,
          ]}
          style={{
            ['--color-surface' as string]: data?.theme?.colorSurface,
            ['--color-on-surface' as string]: data?.theme?.colorOnSurface,
            ['--color-primary' as string]: data?.theme?.colorPrimary,
            ['--color-on-primary' as string]: data?.theme?.colorOnPrimary,
            ['--color-secondary' as string]: data?.theme?.colorSecondary,
            ['--color-on-secondary' as string]: data?.theme?.colorOnSecondary,
            ['--color-accent' as string]: data?.theme?.colorAccent,
            ['--color-on-accent' as string]: data?.theme?.colorOnAccent,
          }}
        >
          {children}

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
    </>
  )
}

const AppRoot = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <App apolloClient={apolloClient}>
        <Component {...pageProps} />
      </App>
    </ApolloProvider>
  )
}

export default AppRoot
