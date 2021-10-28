import { FunctionComponent, useMemo, ReactElement } from 'react'
import { initAEMModel } from '../../../../lib'
import { App as AppComponent, Header, Footer, HeaderMenuItem, Button } from '../../../../components'
import * as AEM from '../../../components/AEM'

// Icons

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
  // const menu = useMemo(
  //   () =>
  //     passportLink
  //       ? [
  //           ..._menu,
  //           <HeaderMenuItem variant="icon" compact>
  //             <Button root={<passportLink.type {...passportLink.props} />} variant="text" transparent>
  //               <span className="hide-sm-only">My Passport</span>
  //             </Button>
  //           </HeaderMenuItem>,
  //         ]
  //       : [..._menu],
  //   [passportLink, _menu]
  // )

  return (
    <AppComponent
      linkRoot={linkRoot}
      {...props}
      header={
        <Header
          logo={
            <AEM.AEMImage
              src="/__assets/wknd/logo.svg"
              alt="WKND Adventures"
              pagePath={APP_AEM_MODEL_PAGE_PATH}
              itemPath="header/logo"
            />
          }
          // menu={menu}
          transparent
          sticky
          style={{ ['--header-text' as string]: 'var(--color-on-surface)' }}
        />
      }
      footer={<Footer menu={footerMenu} />}
    >
      {/* <div style={{ background: '#ccc' }}>
        <AEM.AEMResponsiveGrid pagePath={APP_AEM_MODEL_PAGE_PATH} itemPath="header/nav" />
      </div> */}
      {children}
    </AppComponent>
  )
}
