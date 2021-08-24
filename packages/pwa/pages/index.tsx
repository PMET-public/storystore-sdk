import { NextPage } from 'next'
import { WKND } from '@storystore/ui-kit/experiences'

const Home: NextPage = props => {
  return <WKND.Home heroCTAHref="/adventures" {...props} />
}

export default Home
