import { FunctionComponent, ReactElement } from 'react'
import AppComponent from '../../../components/App'
import Link from '../../../components/Link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import LogoIcon from '../assets/wknd-adventures_logo.svg'

export type AppProps = {
  linkRoot?: ReactElement
  settingsLink?: ReactElement
}

export const App: FunctionComponent<AppProps> = ({ linkRoot, settingsLink, ...props }) => {
  return (
    <AppComponent
      linkRoot={linkRoot}
      {...props}
      header={
        <Header
          logo={
            <Link href="/">
              <LogoIcon aria-label="WKND" />
            </Link>
          }
          transparent
          sticky
        />
      }
      footer={<Footer logo={<LogoIcon />} settingsLink={settingsLink} />}
    />
  )
}
