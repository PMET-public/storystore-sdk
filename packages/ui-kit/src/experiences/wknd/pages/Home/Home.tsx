import { FunctionComponent } from 'react'
import { HomeProps } from './Home.d'
import { useQuery, ServerError } from '@apollo/client'
import { useNetworkStatus } from '../../../../hooks'
import { AdventureTile, AdventureBanner } from '../../components'
import { Error, Block, Banner, Carousel, Heading, Button } from '../../../../components'
import gql from 'graphql-tag'

// Styles
import style from './Home.module.css'

// GraphQL Query
export const HOME_QUERY = gql`
  query HOME_QUERY {
    # Beginner Carousel
    beginner: adventureList(filter: { adventureDifficulty: { _expressions: [{ value: "Beginner" }] } }) {
      items {
        _path
        adventureActivity
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            _path
          }
        }
      }
    }

    # Cycling Banner
    cycling: adventureList(filter: { adventureTitle: { _expressions: [{ value: "Cycling Tuscany" }] } }) {
      items {
        _path
        adventureType
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            _path
          }
        }
      }
    }

    # Camping Carousel
    camping: adventureList(
      filter: { adventureActivity: { _logOp: OR, _expressions: [{ value: "Cycling" }, { value: "Rock Climbing" }] } }
    ) {
      items {
        _path
        adventureActivity
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            _path
          }
        }
      }
    }

    # Overstay Carouse
    overstay: adventureList(filter: { adventureType: { _logOp: OR, _expressions: [{ value: "Overnight Trip" }] } }) {
      items {
        _path
        adventureActivity
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            _path
          }
        }
      }
    }

    # Surfing Banner
    surfing: adventureList(filter: { adventureTitle: { _expressions: [{ value: "Surf Camp in Costa Rica" }] } }) {
      items {
        _path
        adventureType
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            _path
          }
        }
      }
    }
  }
`

export const Home: FunctionComponent<HomeProps> = ({ heroCTA }) => {
  // GraphQL Data
  const { loading, data, error } = useQuery(HOME_QUERY)

  // Network Online/Offline State
  const online = useNetworkStatus()

  // Error View
  if (error) {
    const status = (error.networkError as ServerError).statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  // Page Data
  const beginnerAdventures = loading ? Array(4).fill({ loading }) : data?.beginner?.items
  const campingAdventures = loading ? Array(4).fill({ loading }) : data?.camping?.items
  const overstayAdventures = loading ? Array(4).fill({ loading }) : data?.overstay?.items
  const cyclingAdventure = data?.cycling?.items[0]
  const surfingAdventure = data?.surfing?.items[0]

  return (
    <Block gap={{ sm: 'lg', lg: 'xl' }} className={style.root}>
      {/* Hero (Static Assets) */}
      <Block root={<section />}>
        <Banner
          backgroundColor="#f4ecea"
          backgroundImage={
            <picture>
              <source media="(max-width: 768px)" srcSet="/__assets/wknd/bg-adventures-1--small.jpg" />
              <img src="/__assets/wknd/bg-adventures-1.jpg" alt="" style={{ objectPosition: 'left' }} />
            </picture>
          }
          height={{ sm: '80vh', lg: '70vh' }}
          heading={
            <Heading root={<h2 />} size={{ sm: '4xl', md: '5xl' }} style={{ paddingRight: '100px' }}>
              Not all who wander are lost.
            </Heading>
          }
          button={heroCTA ? <Button root={<heroCTA.type />} {...heroCTA.props} /> : undefined}
          align="left"
          contained
        />
      </Block>

      {/* Beginner Carousel */}
      <Block root={<section />} gap="md" contained padded>
        <Heading root={<h2 />} size={{ sm: 'lg', md: '2xl' }}>
          Trying something new? Start easy.
        </Heading>

        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {beginnerAdventures?.map(({ ...adventure }, key) => (
            <AdventureTile key={adventure._path ?? key} {...adventure} />
          ))}
        </Carousel>
      </Block>

      {/* Cycling Banner */}
      <Block contained padded>
        <AdventureBanner loading={loading} {...cyclingAdventure} />
      </Block>

      {/* Camping Carousel */}
      <Block root={<section />} gap="md" contained padded>
        <Heading root={<h2 />} size="2xl">
          For the outdoor kind.
        </Heading>

        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {campingAdventures?.map(({ ...adventure }, key) => (
            <AdventureTile key={adventure._path ?? key} {...adventure} />
          ))}
        </Carousel>
      </Block>

      {/* Surfing Banner */}
      <Block contained padded>
        <AdventureBanner loading={loading} {...surfingAdventure} />
      </Block>

      {/* Overstay Carousel */}
      <Block root={<section />} gap="md" contained padded>
        <Heading root={<h2 />} size="2xl">
          Time is a construct. Overstay.
        </Heading>

        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {overstayAdventures?.map(({ ...adventure }, key) => (
            <AdventureTile key={adventure._path ?? key} {...adventure} />
          ))}
        </Carousel>
      </Block>
    </Block>
  )
}
