import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { initAEMModel } from '../../../../lib'
import { App as AppComponent, Header, Footer } from '../../../../components'
import { AEM } from '../../../components'

// AEM Model Manager
initAEMModel()

// AEM Model Path
export const APP_AEM_MODEL_PAGE_PATH = '/content/storystore/wknd-adventures'

export type AppProps = HTMLAttributes<HTMLDivElement> & {
  logo?: { src?: string; alt?: string }
  linkRoot?: ReactElement
  passportLink?: ReactElement
  menu?: Array<ReactElement>
  footerMenu?: Array<ReactElement>
}

export const App: FunctionComponent<AppProps> = ({
  logo,
  linkRoot,
  passportLink = <a href="#" />,
  menu: _menu = [],
  footerMenu,
  children,
  ...props
}) => {
  console.log({ logo })
  return (
    <AppComponent
      linkRoot={linkRoot}
      {...props}
      header={
        <Header
          logo={<img src="/__assets/wknd/logo.svg" {...logo} />}
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
