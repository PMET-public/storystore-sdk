import { FunctionComponent, ReactElement } from 'react'
import AppComponent from '../../../components/App'
import Link from '../../../components/Link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import LogoIcon from '../assets/wknd-adventures_logo.svg'

export const App: FunctionComponent<{ linkRoot?: ReactElement }> = ({ ...props }) => {
  return (
    <AppComponent
      {...props}
      header={
        <Header
          logo={
            <Link href="/">
              <LogoIcon />
            </Link>
          }
          transparent
          sticky
        />
      }
      footer={<Footer logo={<LogoIcon />} />}
    />
  )
}
