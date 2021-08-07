import { WKND } from '@storystore/ui-kit/experiences'
import { NextPage } from 'next'

const Home: NextPage = props => {
  return (
    <WKND.Home
      hero={{ text: 'Not all who wander are lost.', cta: { label: 'Find Getaway', href: '/adventures' } }}
      {...props}
    />
  )
}

export default Home
