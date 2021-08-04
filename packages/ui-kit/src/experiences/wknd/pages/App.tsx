import { FunctionComponent } from 'react'
import AppComponent, { AppProps } from '../../../components/App'
import Link from '../../../components/Link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import LogoIcon from '../assets/wknd-adventures_logo.svg'

const App: FunctionComponent<AppProps> = ({ header, footer, ...props }) => {
  return (
    <AppComponent
      header={
        <Header
          logo={
            <Link href="/">
              <LogoIcon />
            </Link>
          }
          transparent
          sticky
          // contained
          {...header}
        />
      }
      footer={<Footer logo={<LogoIcon />} contained {...footer} />}
      {...props}
    />
  )
}

export default App
