import { FunctionComponent } from 'react'
import { gql, useQuery } from '@apollo/client'
import style from './Adventure.module.css'
import { Error, Block, Banner, BannerSkeleton, Heading, Html, Button } from '../../../../components'
import MapIcon from 'remixicon/icons/Map/road-map-line.svg'
import CalendarIcon from 'remixicon/icons/Business/calendar-check-line.svg'
import LengthIcon from 'remixicon/icons/Business/calendar-fill.svg'
import BagIcon from 'remixicon/icons/Business/briefcase-line.svg'
import GroupIcon from 'remixicon/icons/User/group-fill.svg'
import MedalIcon from 'remixicon/icons/Business/medal-2-fill.svg'
import PriceIcon from 'remixicon/icons/Finance/price-tag-3-fill.svg'
import CheckInIcon from 'remixicon/icons/System/check-line.svg'
import CheckedInIcon from 'remixicon/icons/System/check-double-line.svg'
import BookmarkIcon from 'remixicon/icons/Business/bookmark-line.svg'
import BookmarkedIcon from 'remixicon/icons/Business/bookmark-fill.svg'
import ContentLoader from 'react-content-loader'

export type AdventureProps = {
  path: string
  checkedIn?: boolean
  bookmarked?: boolean
  onCheckIn?: (id: string) => any
  onBookmark?: (id: string) => any
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

export const Adventure: FunctionComponent<AdventureProps> = ({
  path,
  checkedIn,
  onCheckIn,
  bookmarked,
  onBookmark,
}) => {
  const { data, loading, error } = useQuery(ADVENTURE_QUERY, { variables: { path } })

  if (error) return <Error status={(error.networkError as any)?.response?.status} style={{ height: '100%' }} />

  const adventure = data?.adventureByPath.item

  return (
    <div className={style.root}>
      {loading && !adventure ? (
        <BannerSkeleton className={style.banner} uniqueKey="adventure-image" />
      ) : (
        <Banner
          backgroundImage={<img src={'/__aem' + adventure.adventurePrimaryImage?.src} alt={adventure.adventureTitle} />}
          className={style.banner}
          screen="lighter"
          vAlign="top"
        />
      )}

      <Block padded className={style.wrapper}>
        {loading && !adventure ? (
          <ContentLoader uniqueKey="adventure-details" viewBox="0 0 604.62 637.75">
            <rect width="191.58" height="23.16" />
            <rect y="31.58" width="396.62" height="38.26" />
            <rect y="106.32" width="604.62" height="353.71" />
            <rect y="492.63" width="295.2" height="61.96" />
            <rect y="575.79" width="295.2" height="61.96" />
            <rect x="308.42" y="492.63" width="295.2" height="61.96" />
            <rect x="308.42" y="575.79" width="295.2" height="61.96" />
          </ContentLoader>
        ) : (
          <Block gap="lg" className={style.content}>
            <header>
              <Heading root={<span />} size={{ sm: 'md', lg: 'lg' }}>
                {adventure.adventureTripLength} {adventure.adventureType}
              </Heading>

              <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }}>
                {adventure.adventureTitle}
              </Heading>
            </header>

            <Block gap="md" align="start" columns={{ sm: '1fr', md: '1fr 1fr', lg: '180px 180px' }}>
              <Button
                variant="cta"
                disabled={!onCheckIn}
                icon={checkedIn ? <CheckedInIcon style={{ fill: 'green' }} /> : <CheckInIcon />}
                onClick={() => onCheckIn?.(path)}
              >
                Check In
              </Button>

              <Button
                variant="primary"
                transparent
                disabled={!onBookmark}
                icon={
                  bookmarked ? (
                    <BookmarkedIcon aria-label="Saved for later" style={{ fill: 'red' }} />
                  ) : (
                    <BookmarkIcon aria-label="Save for later" />
                  )
                }
                onClick={() => onBookmark?.(path)}
              >
                Save for Later
              </Button>
            </Block>

            <Block gap="md" className={style.section}>
              <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
                <MapIcon /> {adventure.adventureActivity} Details
              </Heading>

              <Html htmlString={adventure.adventureDescription.html} />
            </Block>

            <div className={style.details}>
              <span>
                <strong>
                  <LengthIcon />
                  Trip Length:
                </strong>
                {adventure.adventureTripLength}
              </span>
              <span>
                <strong>
                  <GroupIcon />
                  Group Size:
                </strong>
                {adventure.adventureGroupSize}
              </span>
              <span>
                <strong>
                  <MedalIcon />
                  Dificulty:
                </strong>
                {adventure.adventureDifficulty}
              </span>
              <span>
                <strong>
                  <PriceIcon />
                  Price:
                </strong>
                {adventure.adventurePrice}
              </span>
            </div>

            <Block gap="md" className={style.section}>
              <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
                <CalendarIcon /> Itinerary
              </Heading>

              <Html htmlString={adventure.adventureItinerary.html} />
            </Block>

            <Block gap="md" className={style.section}>
              <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
                <BagIcon />
                What to Bring
              </Heading>

              <Html htmlString={adventure.adventureGearList.html} />
            </Block>
          </Block>
        )}
      </Block>
    </div>
  )
}
