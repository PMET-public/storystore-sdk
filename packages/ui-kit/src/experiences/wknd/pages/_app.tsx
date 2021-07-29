import { FunctionComponent } from 'react'
import AppComponent from '../../../components/App'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import LogoIcon from '../assets/wknd-adventures_logo.svg'

const App: FunctionComponent = ({ ...props }) => {
  return (
    <AppComponent
      header={<Header logo={<LogoIcon />} transparent sticky contained />}
      footer={
        <Footer
          logo={<LogoIcon />}
          menu={[<a href="#">Articles</a>, <a href="#">Adventures</a>, <a href="#">About</a>, <a href="#">Contact</a>]}
          contained
        />
      }
      {...props}
    />
  )
}

export default App
