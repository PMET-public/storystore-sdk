import { FunctionComponent, useMemo, ReactElement } from 'react'
import { initAEMModel } from '../../../../lib'
import { App as AppComponent, Header, Footer, HeaderMenuItem, Button } from '../../../../components'

// Icons
import LogoIcon from '../../assets/wknd-adventures_logo.svg'
import MapIcon from 'remixicon-react/RoadMapFillIcon'

// AEM Model Manager
initAEMModel()

export type AppProps = {
  linkRoot?: ReactElement
  homeLink?: ReactElement
  passportLink?: ReactElement
  menu?: Array<ReactElement>
  footerMenu?: Array<ReactElement>
}

export const App: FunctionComponent<AppProps> = ({
  linkRoot,
  homeLink = <a href="#" />,
  passportLink = <a href="#" />,
  menu: _menu = [],
  footerMenu,
  ...props
}) => {
  const menu = useMemo(
    () =>
      passportLink
        ? [
            ..._menu,
            <HeaderMenuItem variant="icon" compact>
              <Button
                root={<passportLink.type {...passportLink.props} />}
                icon={<MapIcon aria-label="My Passport" />}
                variant="text"
                transparent
              >
                <span className="hide-sm-only">My Passport</span>
              </Button>
            </HeaderMenuItem>,
          ]
        : [..._menu],
    [passportLink, _menu]
  )

  return (
    <AppComponent
      linkRoot={linkRoot}
      {...props}
      header={
        <Header
          logo={
            <homeLink.type {...homeLink.props}>
              <LogoIcon aria-label="WKND" />
            </homeLink.type>
          }
          menu={menu}
          transparent
          sticky
          style={{ ['--header-text' as string]: 'var(--color-on-surface)' }}
        />
      }
      footer={<Footer logo={<LogoIcon />} menu={footerMenu} />}
    />
  )
}
