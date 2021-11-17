import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import WKNDApp from '@storystore/ui-kit/dist/experiences/wknd/components/App'
import Head from 'next/head'
import NextLink from 'next/link'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/client'
import { getSiteURLFromPath } from '../lib/get-site-path'
import { useTrackers } from '../lib/tracker'

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

  /** Initialize Google Analytics (production only) */
  useTrackers()

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
          <WKNDApp pagePath={model.__pagePath} myPassportLink={<Link href="/my-passport" />} {...model.page}>
            <Component {...pageProps} />
          </WKNDApp>
        </UIProvider>
      </ApolloProvider>
    </>
  )
}

export default AppRoot
