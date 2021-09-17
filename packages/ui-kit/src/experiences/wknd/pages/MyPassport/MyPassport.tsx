import { FunctionComponent } from 'react'
import { ServerError, useQuery } from '@apollo/client'
import { useNetworkStatus } from '../../../../hooks'
import { AdventureTile } from '../../components'
import { Block, Banner, TileSkeleton, Heading, Error, Carousel } from '../../../../components'
import gql from 'graphql-tag'

// Styles
import style from './MyPassport.module.css'

// Icons
import CheckedInIcon from 'remixicon-react/CheckDoubleLineIcon'
import BookmarkedIcon from 'remixicon-react/Bookmark3FillIcon'

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
  checkIns?: string[]
  bookmarks?: string[]
}

export const MyPassport: FunctionComponent<MyPassportProps> = ({ checkIns, bookmarks }) => {
  // GraphQL Data
  const { error, loading, data } = useQuery(MY_PASSPORT_QUERY, {
    variables: {
      checkIns: checkIns?.map(p => ({ value: p })),
      bookmarks: bookmarks?.map(p => ({ value: p })),
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
        <Banner
          backgroundColor="#f4ecea"
          backgroundImage={
            <picture>
              <source media="(max-width: 768px)" srcSet="/__assets/wknd/bg-adventures-2--small.jpg" />
              <img src="/__assets/wknd/bg-adventures-2.jpg" alt="" style={{ objectPosition: 'top' }} />
            </picture>
          }
          screen="lighter"
          vAlign="top"
          height={{ sm: '40vh', lg: '40vh' }}
          contained
        />
      </Block>

      {/* Saved for Later */}
      <Block root={<section />} gap={{ sm: 'md', lg: 'md' }} contained padded>
        <Heading className={style.heading} root={<h2 />} size={{ sm: 'lg', md: '2xl' }}>
          <BookmarkedIcon color="red" /> It's not <em>if</em>, but <em>when</em>.
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
        <Heading className={style.heading} root={<h2 />} size={{ sm: 'lg', md: '2xl' }}>
          <CheckedInIcon color="green" /> Been there, done that.
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
