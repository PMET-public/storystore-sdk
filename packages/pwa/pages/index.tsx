import { NextPage } from 'next'
import { WKND } from '@storystore/ui-kit/experiences'
import { Link } from '@storystore/ui-kit'

const Home: NextPage = props => {
  return <WKND.Home heroCTA={<Link href="/adventures">View Adventures</Link>} {...props} />
}

export default Home
