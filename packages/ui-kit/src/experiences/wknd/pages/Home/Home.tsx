import { FunctionComponent } from 'react'
import { useQuery, ServerError } from '@apollo/client'
import { useNetworkStatus } from '../../../../hooks'
import { AEMModelProps } from '../../../../lib'

// WKND Components
import { AdventureTile, AdventureBanner } from '../../components'
// AEM Components
import { AEM } from '../../../components'
// UI Components
import { Error, Block, Carousel, Heading } from '../../../../components'
import gql from 'graphql-tag'

// Styles
import style from './Home.module.css'

// Assets
import heroImage from '@storystore/ui-kit/dist/experiences/wknd/assets/bg-adventures-1.jpg'

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

// AEM Model Path
export const HOME_AEM_MODEL_PAGE_PATH = '/content/storystore/wknd-adventures/home'

export type HomeProps = { model?: AEMModelProps }

export const Home: FunctionComponent<HomeProps> = ({ model }) => {
  // GraphQL Data
  const { loading, data, error } = useQuery(HOME_QUERY)

  // Network Online/Offline State
  const online = useNetworkStatus()

  // Error View
  if (error) {
    const status = (error.networkError as ServerError)?.statusCode
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
        <AEM.Banner
          title="Not all who wander are lost."
          titleType="h2"
          fontSize="2xl"
          fontSizeTablet="3xl"
          fontSizeDesktop="5xl"
          backgroundFileReference={heroImage.src}
          backgroundImageLazy={false}
          backgroundColor="#f4ecea"
          buttonLabel="View Adventures"
          buttonLink="/adventures"
          align="left"
          vAlign="middle"
          contained
          {...model?.hero?.banner}
          key="hero-banner"
          pagePath={HOME_AEM_MODEL_PAGE_PATH}
          itemPath="hero/banner"
          height="800px"
          heightTablet="1000px"
        />
      </Block>

      {/* Beginner Carousel */}
      <Block root={<section />} gap="md" contained padded>
        <Heading
          root={
            <AEM.Title
              text="Trying something new? Start easy."
              {...model?.beginner?.heading}
              key="beginner-heading"
              pagePath={HOME_AEM_MODEL_PAGE_PATH}
              itemPath="beginner/heading"
            />
          }
          size={{ sm: 'lg', md: '2xl' }}
        />

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
        <Heading size="2xl">
          <AEM.Title
            text="For the outdoor kind."
            {...model?.outdoor?.heading}
            key="outdoor-heading"
            pagePath={HOME_AEM_MODEL_PAGE_PATH}
            itemPath="outdoor/heading"
          />
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
        <Heading size="2xl">
          <AEM.Title
            text="Time is a construct. Overstay."
            {...model?.overstay?.heading}
            key="overstay-heading"
            pagePath={HOME_AEM_MODEL_PAGE_PATH}
            itemPath="overstay/heading"
          />
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
