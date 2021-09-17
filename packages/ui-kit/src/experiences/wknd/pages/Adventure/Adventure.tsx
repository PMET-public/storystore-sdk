import { FunctionComponent, lazy, Suspense } from 'react'
import { gql, ServerError, useQuery } from '@apollo/client'
import { useNetworkStatus } from '../../../../hooks'
import { Error, Block, Heading, Html, Button } from '../../../../components'
import ContentLoader from 'react-content-loader'

// Styles
import style from './Adventure.module.css'

// Icons
import MapIcon from 'remixicon-react/RoadMapLineIcon'
import CalendarIcon from 'remixicon-react/CalendarCheckLineIcon'
import LengthIcon from 'remixicon-react/CalendarFillIcon'
import BagIcon from 'remixicon-react/BriefcaseLineIcon'
import GroupIcon from 'remixicon-react/GroupFillIcon'
import MedalIcon from 'remixicon-react/MedalFillIcon'
import PriceIcon from 'remixicon-react/PriceTag3FillIcon'
import CheckInIcon from 'remixicon-react/CheckLineIcon'
import CheckedInIcon from 'remixicon-react/CheckDoubleLineIcon'
import BookmarkIcon from 'remixicon-react/Bookmark3LineIcon'
import BookmarkedIcon from 'remixicon-react/Bookmark3FillIcon'

// Lazy Components
const Contributor = lazy(() => import('../../components/Contributor'))

// GraphQL Query
export const ADVENTURE_QUERY = gql`
  query ADVENTURE_QUERY($path: String!) {
    adventureByPath(_path: $path) {
      item {
        _path
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
            _path
            width
            height
          }
        }

        # Contributor
        # You need to create this new Content Fragment first:
        # https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/graphql/multi-step/content-fragment-models.html?lang=en#create-a-contributor-model
        # contributor {
        #   _path
        #   fullName
        #   biographyText {
        #     html
        #   }
        #   pictureReference {
        #     ... on ImageRef {
        #       _path
        #     }
        #   }
        #   occupation
        # }
      }
    }
  }
`

export type AdventureProps = {
  path: string
  checkedIn?: boolean
  bookmarked?: boolean
  onCheckIn?: (id: string) => any
  onBookmark?: (id: string) => any
}

export const Adventure: FunctionComponent<AdventureProps> = ({
  path,
  checkedIn,
  onCheckIn,
  bookmarked,
  onBookmark,
}) => {
  // GraphQL Data
  const { data, loading, error } = useQuery(ADVENTURE_QUERY, { variables: { path } })

  // Network Online/Offline State
  const online = useNetworkStatus()

  // Error View
  if (error) {
    const status = (error.networkError as ServerError)?.statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  // Adventure Object
  const adventure = data?.adventureByPath.item

  const clientSideOnly = typeof window !== 'undefined'

  console.log({ clientSideOnly })

  return (
    <Block className={style.root} columns={{ sm: '1fr', lg: '1fr 1fr' }}>
      {/* Adventure Image */}
      <div className={style.image}>
        {adventure?.adventurePrimaryImage && (
          <img
            src={adventure.adventurePrimaryImage._path}
            width={adventure.adventurePrimaryImage.width}
            height={adventure.adventurePrimaryImage.height}
            alt={adventure.adventureTitle}
          />
        )}
      </div>

      {/* Content */}
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
            {/* Title */}
            <header>
              <Heading root={<span />} size={{ sm: 'md', lg: 'lg' }}>
                {adventure.adventureTripLength} {adventure.adventureType}
              </Heading>

              <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }}>
                {adventure.adventureTitle}
              </Heading>
            </header>

            {/* 
            <Block>
              Add extra section here...
            </Block> 
            */}

            {/* Buttons */}
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

            {/* Description */}
            <Block gap="md" className={style.section}>
              <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
                <MapIcon />
                {adventure.adventureActivity} Details
              </Heading>

              <Html htmlString={adventure.adventureDescription.html} />
            </Block>

            {/* Details List/Icons */}
            <Block className={style.details} gap="md" columns={{ sm: '1fr', md: '1fr 1fr' }}>
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
            </Block>

            {/* Itinerary Section */}
            <Block gap="md" className={style.section}>
              <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
                <CalendarIcon />
                Itinerary
              </Heading>

              <Html htmlString={adventure.adventureItinerary.html} />
            </Block>

            {/* What to Bring Section */}
            <Block gap="md" className={style.section}>
              <Heading root={<h3 />} className={style.heading} size={{ sm: 'xl', lg: '2xl' }}>
                <BagIcon />
                What to Bring
              </Heading>

              <Html htmlString={adventure.adventureGearList.html} />
            </Block>

            {/* 
              Contributor is lazy loaded only when the data is available. 
              To enable, please make sure you add/uncomment the GraphQl query above  
            */}
            {clientSideOnly && (
              <Suspense fallback="">
                {adventure.contributor && (
                  <Block>
                    <Contributor {...adventure.contributor} />
                  </Block>
                )}
              </Suspense>
            )}

            {/* 
            <Block>
              Add extra section here...
            </Block> 
            */}
          </Block>
        )}
      </Block>
    </Block>
  )
}
