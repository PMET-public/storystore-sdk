import { FunctionComponent, ReactElement } from 'react'
import { initAEMModel } from '../../../../lib'
import { App as AppComponent, Header, Footer } from '../../../../components'
import { AEM } from '../../../components'

// AEM Model Manager
initAEMModel()

// AEM Model Path
export const APP_AEM_MODEL_PAGE_PATH = '/content/storystore/wknd-adventures'

export type AppProps = {
  linkRoot?: ReactElement
  passportLink?: ReactElement
  menu?: Array<ReactElement>
  footerMenu?: Array<ReactElement>
}

export const App: FunctionComponent<AppProps> = ({
  linkRoot,
  passportLink = <a href="#" />,
  menu: _menu = [],
  footerMenu,
  children,
  ...props
}) => {
  return (
    <AppComponent
      linkRoot={linkRoot}
      {...props}
      header={
        <Header
          logo={
            <AEM.Image
              src="/__assets/wknd/logo.svg"
              alt="WKND Adventures"
              pagePath={APP_AEM_MODEL_PAGE_PATH}
              itemPath="header/logo"
            />
          }
          nav={
            <nav>
              <AEM.Button pagePath={APP_AEM_MODEL_PAGE_PATH} itemPath="header/nav/my-passport" />
            </nav>
          }
          transparent
          sticky
          style={{ ['--header-text' as string]: 'var(--color-on-surface)' }}
        />
      }
      footer={<Footer nav={<div>{footerMenu}</div>} />}
    >
      {children}
    </AppComponent>
  )
}
