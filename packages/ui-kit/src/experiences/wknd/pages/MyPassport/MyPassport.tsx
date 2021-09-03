import { FunctionComponent, ReactElement } from 'react'
import style from './MyPassport.module.css'
import { useQuery } from '@apollo/client'
import { Link, Block, Banner, Tile, TileSkeleton, Heading, Error, Carousel } from '../../../../components'
import gql from 'graphql-tag'
import CheckedInIcon from 'remixicon/icons/System/check-double-line.svg'
import BookmarkedIcon from 'remixicon/icons/Business/bookmark-fill.svg'

export const MY_PASSPORT_QUERY = gql`
  query MY_PASSPORT_QUERY($checkIns: [IDFilterExpression] = [], $bookmarks: [IDFilterExpression] = []) {
    checkIns: adventureList(filter: { _path: { _logOp: OR, _expressions: $checkIns } }) {
      items {
        id: _path
        adventureActivity
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            id: _path
            src: _path
          }
        }
      }
    }

    bookmarks: adventureList(filter: { _path: { _logOp: OR, _expressions: $bookmarks } }) {
      items {
        id: _path
        adventureActivity
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            id: _path
            src: _path
          }
        }
      }
    }
  }
`

export type MyPassportProps = {
  checkIns?: string[]
  bookmarks?: string[]
}

const getEmptySlotsQty = (from = 0, to = 4) => {
  const result = to - from
  return result < 0 ? 0 : result
}

export const MyPassport: FunctionComponent<MyPassportProps> = ({ checkIns, bookmarks }) => {
  const { error, loading, data } = useQuery(MY_PASSPORT_QUERY, {
    variables: {
      checkIns: checkIns?.map(p => ({ value: p })),
      bookmarks: bookmarks?.map(p => ({ value: p })),
    },
  })

  if (error) {
    console.log(error.networkError)
    return <Error status={(error.networkError as any)?.response?.status} style={{ height: '100%' }} />
  }

  return (
    <Block gap={{ sm: 'lg', lg: 'xl' }} className={style.root}>
      {/* Hero */}
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

      {/* Check-ins */}
      <Block root={<section />} gap={{ sm: 'md', lg: 'md' }} contained padded>
        <Heading className={style.heading} root={<h2 />} size={{ sm: 'lg', md: '2xl' }}>
          <CheckedInIcon style={{ fill: 'green ' }} /> Been there, done that.
        </Heading>
        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {data?.checkIns?.items.map(
            ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
              <Tile
                root={<Link href={id} />}
                className={style.stamp}
                key={id}
                image={
                  <img
                    loading="lazy"
                    src={'/__aem' + adventurePrimaryImage?.src}
                    width={400}
                    height={400}
                    alt={adventureTitle}
                  />
                }
                heading={<Heading root={<h3 />}>{adventureTitle}</Heading>}
                tags={[`${adventureTripLength} ${adventureActivity}`]}
                surface
              />
            )
          )}

          {Array(getEmptySlotsQty(data?.checkIns?.items?.length, 4))
            .fill(null)
            .map((_, key) => (
              <TileSkeleton
                key={key}
                className={style.empty}
                uniqueKey={`checkIns-carousel--${key}`}
                surface
                animate={loading}
              />
            ))}
        </Carousel>
      </Block>

      {/* bookmarks */}
      <Block root={<section />} gap={{ sm: 'md', lg: 'md' }} contained padded>
        <Heading className={style.heading} root={<h2 />} size={{ sm: 'lg', md: '2xl' }}>
          <BookmarkedIcon style={{ fill: 'red' }} /> It's not <em>if</em>, but <em>when</em>.
        </Heading>
        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {data?.bookmarks?.items.map(
            ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
              <Tile
                root={<Link href={id} />}
                className={style.stamp}
                key={id}
                image={
                  <img
                    loading="lazy"
                    src={'/__aem' + adventurePrimaryImage?.src}
                    width={400}
                    height={400}
                    alt={adventureTitle}
                  />
                }
                heading={<Heading root={<h3 />}>{adventureTitle}</Heading>}
                tags={[`${adventureTripLength} ${adventureActivity}`]}
                surface
              />
            )
          )}

          {Array(getEmptySlotsQty(data?.bookmarks?.items?.length, 4))
            .fill(null)
            .map((_, key) => (
              <TileSkeleton
                key={key}
                className={style.empty}
                uniqueKey={`bookmarks-carousel--${key}`}
                surface
                animate={loading}
              />
            ))}
        </Carousel>
      </Block>
      <br />
    </Block>
  )
}
