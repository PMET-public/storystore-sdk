import { FunctionComponent } from 'react'
import { ServerError, useQuery } from '@apollo/client'
import { useNetworkStatus } from '../../../../hooks'
import { AEMModelProps } from '../../../../lib'

// WKND Components
import { AdventureTile } from '../../components'
// AEM Components
import { AEMBanner, AEMTitle } from '../../../components'
// UI Components
import { Block, TileSkeleton, Heading, Error, Carousel } from '../../../../components'
import gql from 'graphql-tag'

// Styles
import style from './MyPassport.module.css'

// Icons
import CheckedInIcon from 'remixicon-react/CheckDoubleLineIcon'
import BookmarkedIcon from 'remixicon-react/Bookmark3FillIcon'

// AEM Model Path
export const MY_PASSPORT_AEM_MODEL_PAGE_PATH = '/content/storystore/wknd-adventures/us/en/my-passport'

// GraphQL Query
export const MY_PASSPORT_QUERY = gql`
  query MY_PASSPORT_QUERY($checkIns: [IDFilterExpression] = [], $bookmarks: [IDFilterExpression] = []) {
    saved: adventureList(filter: { _path: { _logOp: OR, _expressions: $bookmarks } }) {
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

    checkedIns: adventureList(filter: { _path: { _logOp: OR, _expressions: $checkIns } }) {
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
  }
`

const getEmptySlotsQty = (from = 0, to = 4) => {
  const result = to - from
  return result < 0 ? 0 : result
}

export type MyPassportProps = {
  model?: AEMModelProps
  checkIns?: string[]
  bookmarks?: string[]
}

export const MyPassport: FunctionComponent<MyPassportProps> = ({ model, checkIns, bookmarks }) => {
  // GraphQL Data
  const { error, loading, data } = useQuery(MY_PASSPORT_QUERY, {
    variables: {
      checkIns: checkIns?.map(value => ({ value })),
      bookmarks: bookmarks?.map(value => ({ value })),
    },
  })

  // Network Online/Offline State
  const online = useNetworkStatus()

  // Error View
  if (error) {
    const status = (error.networkError as ServerError)?.statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  // Data
  const saved = data?.saved?.items
  const checkedIns = data?.checkedIns?.items

  return (
    <Block className={style.root} gap={{ sm: 'lg', lg: 'xl' }}>
      {/* Hero (Static Content) */}
      <Block>
        <AEMBanner
          {...model?.hero?.banner}
          key="hero-banner"
          pagePath={MY_PASSPORT_AEM_MODEL_PAGE_PATH}
          itemPath="hero/banner"
          height="400px"
          heightTablet="600px"
          style={{ objectPosition: 'top' }}
        />
      </Block>

      {/* Saved for Later */}
      <Block root={<section />} gap={{ sm: 'md', lg: 'md' }} contained padded>
        <Heading icon={<BookmarkedIcon color="red" />} size={{ sm: 'lg', md: '2xl' }}>
          <AEMTitle
            {...model?.bookmarks?.heading}
            key="bookmarks-heading"
            pagePath={MY_PASSPORT_AEM_MODEL_PAGE_PATH}
            itemPath="bookmarks/heading"
          />
        </Heading>

        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {saved?.map(({ ...adventure }: any) => (
            <AdventureTile key={adventure.path} className={style.stamp} {...adventure} />
          ))}

          {/* Generate Passport empty slots */}
          {Array(getEmptySlotsQty(saved?.length, 4))
            .fill(null)
            .map((_, key) => (
              <TileSkeleton
                key={key}
                className={style.empty}
                uniqueKey={`saved-carousel--${key}`}
                surface
                animate={loading}
              />
            ))}
        </Carousel>
      </Block>

      {/* Check-ins */}
      <Block root={<section />} gap={{ sm: 'md', lg: 'md' }} contained padded>
        <Heading icon={<CheckedInIcon color="green" />} size={{ sm: 'lg', md: '2xl' }}>
          <AEMTitle
            key="checkins-heading"
            {...model?.checkins?.heading}
            pagePath={MY_PASSPORT_AEM_MODEL_PAGE_PATH}
            itemPath="checkins/heading"
          />
        </Heading>

        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {checkedIns?.map(({ ...adventure }: any) => (
            <AdventureTile key={adventure.path} className={style.stamp} {...adventure} />
          ))}

          {/* Generate Passport empty slots */}
          {Array(getEmptySlotsQty(checkedIns?.length, 4))
            .fill(null)
            .map((_, key) => (
              <TileSkeleton
                key={key}
                className={style.empty}
                uniqueKey={`checkedIns-carousel--${key}`}
                surface
                animate={loading}
              />
            ))}
        </Carousel>
      </Block>
    </Block>
  )
}
