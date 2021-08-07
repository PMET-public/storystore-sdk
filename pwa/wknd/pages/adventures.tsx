import { WKND } from '@storystore/ui-kit/experiences'
import { NextPage } from 'next'

const Home: NextPage = props => {
  return <WKND.Adventures {...props} />
}

export default Home
