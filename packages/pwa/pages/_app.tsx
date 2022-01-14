import { FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import { UIProvider } from '@storystore/ui-kit/theme'
import { App, Header, Footer } from '@storystore/ui-kit/components'
import { initAEMModelManager, useAEMPageModel } from '@storystore/ui-kit/AEM'
import Head from 'next/head'
import NextLink from 'next/link'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/client'
import { getSiteURLFromPath } from '../lib/get-site-path'
import { useTrackers } from '../lib/tracker'
import LogoIcon from 'remixicon-react/AppsFillIcon'

// Global Styles
import '@storystore/ui-kit/dist/theme/css/global.css'
import '@storystore/ui-kit/dist/theme/css/aem.css'

import { useRouter } from 'next/router'

// Initialize AEM Model Manager and AEM SPA Components
initAEMModelManager(process.env.NEXT_PUBLIC_URL)

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

  /** Get Page Model */
  const { asPath } = useRouter()

  const pageModel = useAEMPageModel(asPath)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=no"
        />
        <meta name="apple-mobile-web-app-title" content={pageModel?.branding?.siteName || ''} />
        <title>
          {pageModel?.branding?.siteName} | {pageModel?.title}
        </title>
        <meta name="description" content={pageModel?.description || ''} />
        <meta name="keywords" content={pageModel?.keywords || ''} />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link rel="shortcut icon" type="image/png" href={getSiteURLFromPath('/favicon.ico')} />
        <link rel="apple-touch-icon" href={getSiteURLFromPath('/icons/apple-touch-icon.png')} />
        <link rel="manifest" href={getSiteURLFromPath('/manifest.webmanifest')} crossOrigin="use-credentials" />

        {/* AEM Base CSS */}
        <link rel="stylesheet" href="/etc.clientlibs/storystore/clientlibs/clientlib-base.css" type="text/css" />

        {/* Google Analytics */}
        <link href="https://www.google-analytics.com" rel="preconnect" crossOrigin="anonymous" />

        {pageModel?.branding?.colorSecondary && <meta name="theme-color" content={pageModel.branding.colorSecondary} />}

        {pageModel?.branding && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
              :root {
                background-color: ${pageModel.branding.colorBody};
                color: ${pageModel.branding.colorOnBody};
              }
            `,
            }}
          />
        )}
      </Head>

      <ApolloProvider client={apolloClient}>
        <UIProvider
          style={
            pageModel?.branding && {
              ['--color-body' as string]: pageModel.branding.colorBody,
              ['--color-on-body' as string]: pageModel.branding.colorOnBody,
              ['--color-surface' as string]: pageModel.branding.colorSurface,
              ['--color-on-surface' as string]: pageModel.branding.colorOnSurface,
              ['--color-primary' as string]: pageModel.branding.colorPrimary,
              ['--color-on-primary' as string]: pageModel.branding.colorOnPrimary,
              ['--color-secondary' as string]: pageModel.branding.colorSecondary,
              ['--color-on-secondary' as string]: pageModel.branding.colorOnSecondary,
            }
          }
        >
          <App
            linkRoot={<Link />}
            header={
              <Header
                variant="secondary"
                // transparent
                sticky
                logo={
                  <Link href="/">
                    {pageModel?.branding?.logoFile ? (
                      <img src={pageModel.branding.logoFile} alt={pageModel.branding.siteName} />
                    ) : (
                      <LogoIcon />
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
              <Footer>
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
