import { FunctionComponent, useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import { App, Header, Footer } from '@storystore/ui-kit/components'
import { ModelManager, ModelClient } from '@adobe/aem-spa-page-model-manager'
import Head from 'next/head'
import NextLink from 'next/link'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/client'
import { getSiteURLFromPath } from '../lib/get-site-path'
import { useRouter } from 'next/router'

/** Global Styles */
import '@storystore/ui-kit/dist/theme/css/global.css'
import '@storystore/ui-kit/dist/theme/css/aem.css'

/** Load AEM Components */
import '../components'

/** Initialize AEM Model */
ModelManager.initializeAsync({ modelClient: new ModelClient(process.env.NEXT_PUBLIC_URL) })

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

  console.log('_app, PageModel', pageModel)

  const branding = {
    siteName: 'Kriss+',
    colorBody: '#fff',
    colorOnBody: '#222',
    colorSurface: '#f6f6f6',
    colorOnSurface: '#222',
    colorPrimary: '#FCB034',
    colorOnPrimary: '#fff',
    colorSecondary: '#233266',
    colorOnSecondary: '#fff',
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

        {branding.colorSecondary && <meta name="theme-color" content={branding.colorSecondary} />}

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
          }}
        >
          <App
            linkRoot={<Link />}
            header={
              <Header
                variant="secondary"
                contained
                // transparent
                sticky
                logo={
                  <Link href="/">
                    {branding.logoFile ? (
                      <img src={branding.logoFile} alt={branding.siteName} />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 145.9 27"
                        style={{ width: 150, fill: branding.colorOnSecondary }}
                      >
                        <path
                          d="M108.8 18.4v-1.2c0-5.1 0-8-.7-8.7h.9c2.3 0 4.2-.3 5.7-.3 3.6 0 5.3 1.6 5.3 4.9 0 3.4-2.2 5.7-5.3 5.7-1.1 0-2.1-.2-2.8-.6h.3c3.1 0 4.9-1.8 4.9-4.9 0-2.6-1.2-3.9-3.7-3.9-.6 0-1.2 0-1.9.1-.2.8-.3 3.6-.3 8.5 0 5.2 0 8 .7 8.7H108c.7-.7.8-3.4.8-8.3zm-6.3-.3c0-5.5-2.3-8.7-5.9-8.7-3.7 0-6 2.7-6 7.8 0 5.5 2.4 8.5 6.4 8.5 3.4 0 5.5-2.7 5.5-7.6zM87.7 18c0-6.4 3.2-9.8 9.2-9.8 5.6 0 8.4 3 8.4 8.9 0 6.1-3.7 10-9.3 10-5.3 0-8.3-3.3-8.3-9.1zm-5.3-2.5c0-4 0-6.2-.7-7h3.9c-.7.7-.7 3.2-.7 8v2.2c0 4.7 0 7.3.7 8h-3.9c.7-.8.7-3.1.7-7v-2.2h-8.5v2.2c0 4 0 6.3.7 7h-3.9c.7-.7.7-3.4.7-8.3v-1.2c0-5.1 0-8-.7-8.7h3.9c-.7.8-.7 3-.7 7v.9h8.5v-.9zm-27.3 6.6c1.3 2.3 3.4 3.5 6.1 3.5 2.7 0 4.5-1.8 4.5-4.2 0-2-1.2-3.3-3.7-4.6-3.5-1.9-6.2-3.2-6.2-6.7 0-3.2 2.6-5.7 7.1-5.7 1.7 0 3 .1 3.6.1H68V8c-.9-1.5-2.4-2.2-4.5-2.2-3 0-4.6 1.4-4.6 3.4 0 2.4 2.1 3.4 4.7 4.8 3.5 1.9 5.3 3.6 5.3 6.3 0 3.5-3.3 6.6-7.8 6.6-1.9 0-3.9-.5-6-1.3v-3.5zm-14.4.8c1.1 1.9 2.9 2.9 5.1 2.9 2.3 0 3.7-1.5 3.7-3.5 0-1.7-1-2.8-3-3.9-3-1.6-5.2-2.7-5.2-5.5 0-2.6 2.2-4.7 5.9-4.7 1.5 0 2.5.1 3 .1h1.2v3c-.7-1.2-2-1.8-3.8-1.8-2.5 0-3.8 1.2-3.8 2.9 0 2 1.7 2.9 4 4 2.9 1.6 4.4 3 4.4 5.2 0 2.9-2.7 5.5-6.5 5.5-1.6 0-3.2-.4-5-1.1v-3.1zm-6.2-4.5v-1.2c0-5.1 0-8-.7-8.7h3.9c-.7.7-.7 3.2-.7 8v2.2c0 4.7 0 7.3.7 8h-3.9c.7-.7.7-3.4.7-8.3zm-12-1.5c2.8 0 4.3-1.5 4.3-4.2 0-2.2-1.1-3.3-3.4-3.3-.5 0-1.1 0-1.8.1-.2.9-.3 2.8-.3 5.7v1.6c.3.1.7.1 1.2.1zm2.7-8.6c2.9 0 4.4 1.2 4.4 3.6 0 2.4-1.5 4.1-4.3 5.4l4.1 5.7c1.4 1.9 2.5 3.1 3.4 3.8H30c-.7 0-1-.1-1.4-.7l-4.9-6.8c-.6-.8-1-1.2-2.2-1.2h-.2v1.7c0 4 0 6.3.7 7.1h-3.9c.7-.7.7-3.4.7-8.3v-1.2c0-5.1 0-8-.7-8.7h.9c3-.2 5-.4 6.2-.4zM7.3 12.1c3.3-3.5 5-5.5 5-6.7v-.1c0-.1 0-.3-.1-.4h4.5c-1.3.8-4.7 4.1-9.9 9.9l5.5 7.8c1.2 1.6 2.1 3.1 3.4 4.2h-3.4c-.6 0-1-.1-1.4-.6L4.5 15.9h-.7v2.4c0 4.8 0 7.5.9 8.5H0c.8-.9.9-4.1.9-10v-1.4C.9 9.2.9 5.8 0 4.9h4.6c-.9 1-.9 3.6-.9 8.4v1.5c1.1-.2 2.2-1.1 3.6-2.7zm129.8 10.8c-.2.3-.5.6-.7.4-.2-.2.1-.6.1-.6l3.1-4.8c.5-.8 1.3-2.2 1.3-3.5 0-1.3-1-3-1-3l-7-11.3-1.3 2c-.5.8-.1 1.7-.1 1.7l6.2 10.2c1.4 2.4-.6 5.1-.6 5.1l-3.7 5.8h3.1c1.6 0 2.3-1.3 2.3-1.3l1.9-3c.7-1.1 1.6-1.1 1.6-1.1h1.8c-1.1.5-1.6 1.6-1.6 1.6l-2.2 3.4c-.9 1.3-1.9 1.1-1.9 1.1h-8.8l4.2-6.5c1-1.5 0-2.7 0-2.7l-5.6-9-1.2 1.8c-1 1.6 0 2.6 0 2.6l4 6.4c.9 1.3.3 2.2.3 2.2l-4.5 6.9h11.9c2.2 0 3-1.8 3-1.8l2.5-3.8c.6-1 1.9-.8 1.9-.8l-1.7-2.7H142c-1.7 0-2.4 1.5-2.4 1.5l-2.5 3.2m-4.6 1.9l4.1-6.3c1.7-2.6.1-4.8.1-4.8l-6.2-10.1-1.5 2.3c-.5.8 0 1.6 0 1.6l5.3 8.8c.7 1.3.2 2.6.2 2.6l-3.8 6h1.8"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </Link>
                }
                // nav={
                //   <AEMExperienceFragment pagePath="/content/experience-fragments/storystore/us/en/site/header/master" />
                // }
                // nav={
                //   <nav>
                //     <Button
                //       root={<link.type {...link.props} href="/my-passport" />}
                //       icon={<MyPassportIcon />}
                //       size="sm"
                //       variant="text"
                //     >
                //       My Passport
                //     </Button>
                //   </nav>
                // }
              />
            }
            footer={
              <Footer contained>
                {/* <AEMCExperienceFragment pagePath="/content/experience-fragments/storystore/us/en/site/footer/master" /> */}
              </Footer>
            }
            // footer={
            //   <Footer
            //     legal={
            //       <nav>
            //         <link.type {...link.props} href="/settings">
            //           UIKit Settings
            //         </link.type>
            //       </nav>
            //     }
            //   />
            // }
          >
            <Component {...pageProps} />
          </App>
        </UIProvider>
      </ApolloProvider>
    </>
  )
}

export default AppRoot
