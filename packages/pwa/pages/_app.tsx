import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import { App, Header, Footer } from '@storystore/ui-kit/components'
import { ModelManager, ModelClient, AuthoringUtils } from '@adobe/aem-spa-page-model-manager'
import Head from 'next/head'
import NextLink from 'next/link'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/client'
import { getSiteURLFromPath } from '../lib/get-site-path'
import NextImage from '../components/NextImage'
import NextNprogress from 'nextjs-progressbar'

/** Global Styles */
import '@storystore/ui-kit/dist/theme/css/global.css'
import '@storystore/ui-kit/dist/theme/css/aem.css'

/** Default logo */
import StoryStoreLogo from 'remixicon-react/TerminalBoxFillIcon'

/** Load AEM Components */
import '../components'

/** Initialize AEM Model */

ModelManager.initializeAsync({
  modelClient: new ModelClient(new URL(process.env.NEXT_PUBLIC_URL).origin),
})

const Link: FunctionComponent<any> = ({ href, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props} />
    </NextLink>
  )
}

const AppRoot = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps)

  const { pageModel } = pageProps

  const branding = {
    siteName: 'WKND Adventures',
    colorBody: '#f3f3f3',
    colorOnBody: '#222',
    // colorSurface: '#f3f3f3',
    // colorOnSurface: '#222',
    // colorPrimary: '#111',
    // colorOnPrimary: '#fff',
    // colorSecondary: '#ff9f00',
    // colorOnSecondary: '#fff',
    // rounded: '1rem',
    ...pageModel?.branding,
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=no"
        />
        <meta name="apple-mobile-web-app-title" content={branding.siteName || ''} />
        <meta name="description" content={pageModel?.description || ''} />
        <meta name="keywords" content={pageModel?.keywords || ''} />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <title>{[branding.siteName, pageModel?.title].filter(x => !!x).join(' | ')}</title>

        <link rel="shortcut icon" type="image/png" href={getSiteURLFromPath('/favicon.ico')} />
        <link rel="apple-touch-icon" href={getSiteURLFromPath('/icons/apple-touch-icon.png')} />
        <link rel="manifest" href={getSiteURLFromPath('/manifest.webmanifest')} crossOrigin="use-credentials" />

        {/* AEM Grid CSS (Responsive Layout) */}
        <link
          rel="stylesheet"
          href={`/etc.clientlibs/${process.env.NEXT_PUBLIC_AEM_SITE}/clientlibs/clientlib-grid.css`}
          type="text/css"
        />

        {/* Google Analytics */}
        <link href="https://www.google-analytics.com" rel="preconnect" crossOrigin="anonymous" />

        {branding.colorPrimary && <meta name="theme-color" content={branding.colorPrimary} />}

        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                background-color: ${branding.colorBody};
                color: ${branding.colorOnBody};
              }
            `,
          }}
        />
      </Head>

      <NextNprogress
        color={branding.colorAccent}
        startPosition={0.4}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false, easing: 'ease' }}
      />

      <ApolloProvider client={apolloClient}>
        <UIProvider
          style={{
            ['--color-body' as string]: branding.colorBody,
            ['--color-on-body' as string]: branding.colorOnBody,
            ['--color-surface' as string]: branding.colorSurface,
            ['--color-on-surface' as string]: branding.colorOnSurface,
            ['--color-primary' as string]: branding.colorPrimary,
            ['--color-on-primary' as string]: branding.colorOnPrimary,
            ['--color-secondary' as string]: branding.colorSecondary,
            ['--color-on-secondary' as string]: branding.colorOnSecondary,
            ['--rounded' as string]: branding.rounded,
          }}
        >
          <App
            style={
              // Fix authorinz dynamic heights
              AuthoringUtils.isInEditor()
                ? {
                    ['--app-body-height' as string]: process.browser
                      ? `calc(${window.innerHeight}px - var(--app-header-height))`
                      : '100%',
                  }
                : undefined
            }
            linkRoot={<Link />}
            header={
              <Header
                variant="primary"
                contained
                sticky
                transparent
                logo={
                  <Link href={`/content/${process.env.NEXT_PUBLIC_AEM_SITE}/us/en`}>
                    {branding.logoFile ? (
                      <NextImage src={branding.logoFile} alt={branding.siteName} />
                    ) : (
                      <StoryStoreLogo aria-label="StoryStore.SDK" />
                    )}
                  </Link>
                }
              />
            }
            footer={<Footer contained></Footer>}
          >
            <Component {...pageProps} />
          </App>
        </UIProvider>
      </ApolloProvider>
    </>
  )
}

export default AppRoot
