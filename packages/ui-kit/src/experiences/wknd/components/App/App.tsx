import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { initAEMModel } from '../../../../lib'
import { AEM } from '../../../components'
import { PageContext } from '../../../components/AEM/Page'
import { App as AppComponent, Header, Footer, SkeletonLoader, Button } from '../../../../components'

import MyPassportIcon from 'remixicon-react/Map2LineIcon'

// AEM Model Manager
initAEMModel()

// AEM Model Path
export const APP_AEM_MODEL_PAGE_PATH = '/content/storystore/wknd-adventures'

export type AppProps = HTMLAttributes<HTMLDivElement> & {
  pagePath?: string
  linkRoot?: ReactElement
}

export const App: FunctionComponent<AppProps> = ({
  linkRoot,
  pagePath = APP_AEM_MODEL_PAGE_PATH,
  children,
  ...props
}) => {
  const link = linkRoot ?? <a />

  return (
    <AEM.Page pagePath={pagePath} {...props}>
      <PageContext.Consumer>
        {({ logoFile, siteName }) => (
          <AppComponent
            linkRoot={linkRoot}
            header={
              <Header
                variant="surface"
                transparent
                sticky
                logo={
                  logoFile ? (
                    <link.type {...link.props} href="/">
                      <img src={logoFile} alt={siteName} />
                    </link.type>
                  ) : (
                    <SkeletonLoader uniqueKey="header--logo" width={250} height={100}>
                      <rect width="100%" height="100%" />
                    </SkeletonLoader>
                  )
                }
                nav={
                  <nav>
                    <Button
                      root={<link.type {...link.props} href="/my-passport" />}
                      icon={<MyPassportIcon />}
                      size="sm"
                      variant="text"
                    >
                      My Passport
                    </Button>
                  </nav>
                }
                style={{
                  ['--header-text' as string]: 'var(--color-on-surface)',
                  ...props.style,
                }}
              />
            }
            footer={
              <Footer
                legal={
                  <nav>
                    <link.type {...link.props} href="/settings">
                      UIKit Settings
                    </link.type>
                  </nav>
                }
              />
            }
          >
            {children}
          </AppComponent>
        )}
      </PageContext.Consumer>
    </AEM.Page>
  )
}
