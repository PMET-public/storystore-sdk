import { FunctionComponent } from 'react'
import { gql, useQuery } from '@apollo/client'
import style from './Adventure.module.css'
import View from '../../../../components/View'
import Grid from '../../../../components/Grid'
import Banner from '../../../../components/Banner'
import Heading from '../../../../components/Heading'
import Html from '../../../../components/Html'
import MapIcon from 'remixicon/icons/Map/road-map-line.svg'
import CalendarIcon from 'remixicon/icons/Business/calendar-check-line.svg'
import LengthIcon from 'remixicon/icons/Business/calendar-fill.svg'
import BagIcon from 'remixicon/icons/Business/briefcase-line.svg'
import GroupIcon from 'remixicon/icons/User/group-fill.svg'
import MedalIcon from 'remixicon/icons/Business/medal-2-fill.svg'
import PriceIcon from 'remixicon/icons/Finance/price-tag-3-fill.svg'

export type AdventureProps = {
  path: string
}

export const ADVENTURE_QUERY = gql`
  query ADVENTURE_QUERY($path: String!) {
    adventureByPath(_path: $path) {
      item {
        id: _path
        adventureTitle
        adventureType
        adventureTripLength
        adventureActivity
        adventureGroupSize
        adventureDifficulty
        adventurePrice
        adventureDescription {
          html
        }
        adventureItinerary {
          html
        }
        adventureGearList {
          html
        }
        adventurePrimaryImage {
          ... on ImageRef {
            id: _path
            src: _path
            width
            height
          }
        }
      }
    }
  }
`

export const Adventure: FunctionComponent<AdventureProps> = ({ path }) => {
  const { loading, data, error } = useQuery(ADVENTURE_QUERY, { variables: { path } })

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>There was an issue.</h1>

  const {
    adventureTitle,
    adventureActivity,
    adventureTripLength,
    adventureType,
    adventureDifficulty,
    adventurePrice,
    adventureGroupSize,
    adventurePrimaryImage,
    adventureDescription,
    adventureGearList,
    adventureItinerary,
  } = data.adventureByPath?.item || {}

  return (
    <div className={style.root}>
      <Banner
        backgroundImage={<img src={'/__aem' + adventurePrimaryImage.src} alt={adventureTitle} />}
        className={style.banner}
        screen="lighter"
        vAlign="top"
      />

      <View padded className={style.wrapper}>
        <Grid gap="lg" className={style.content}>
          <header>
            <Heading root={<span />} size={{ sm: 'md', lg: 'lg' }}>
              {adventureTripLength} {adventureType}
            </Heading>
            <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }}>
              {adventureTitle}
            </Heading>
          </header>
          <Grid gap="md" className={style.section}>
            <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
              <MapIcon /> {adventureActivity} Details
            </Heading>

            <Html htmlString={adventureDescription.html} />
          </Grid>

          <div className={style.details}>
            <span>
              <strong>
                <LengthIcon />
                Trip Length:
              </strong>
              {adventureTripLength}
            </span>
            <span>
              <strong>
                <GroupIcon />
                Group Size:
              </strong>
              {adventureGroupSize}
            </span>
            <span>
              <strong>
                <MedalIcon />
                Dificulty:
              </strong>
              {adventureDifficulty}
            </span>
            <span>
              <strong>
                <PriceIcon />
                Price:
              </strong>
              {adventurePrice}
            </span>
          </div>

          <Grid gap="md" className={style.section}>
            <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
              <CalendarIcon /> Itinerary
            </Heading>

            <Html htmlString={adventureItinerary.html} />
          </Grid>

          <Grid gap="md" className={style.section}>
            <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
              <BagIcon />
              What to Bring
            </Heading>

            <Html htmlString={adventureGearList.html} />
          </Grid>
          <br />
        </Grid>
      </View>
    </div>
  )
}
