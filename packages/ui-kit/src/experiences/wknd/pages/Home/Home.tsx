import { FunctionComponent, ReactElement } from 'react'
import style from './Home.module.css'
import { useQuery } from '@apollo/client'
import { useNetworkStatus } from '../../../../hooks'
import Link from '../../../../components/Link'
import Block from '../../../../components/Block'
import Banner, { BannerSkeleton } from '../../../../components/Banner'
import Carousel from '../../../../components/Carousel'
import Tile, { TileSkeleton } from '../../../../components/Tile'
import Heading from '../../../../components/Heading'
import Button from '../../../../components/Button'
import Error from '../../../../components/Error'
import gql from 'graphql-tag'

export const HOME_QUERY = gql`
  query HOME_QUERY {
    beginner: adventureList(filter: { adventureDifficulty: { _expressions: [{ value: "Beginner" }] } }) {
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

    camping: adventureList(
      filter: { adventureActivity: { _logOp: OR, _expressions: [{ value: "Cycling" }, { value: "Rock Climbing" }] } }
    ) {
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

    overstay: adventureList(filter: { adventureType: { _logOp: OR, _expressions: [{ value: "Overnight Trip" }] } }) {
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

export type HomeProps = {
  heroCTA?: ReactElement
}

export const Home: FunctionComponent<HomeProps> = ({ heroCTA }) => {
  const { error, loading, data } = useQuery(HOME_QUERY, { context: { clientName: 'aem' } })

  const online = useNetworkStatus()

  if (error) return <Error status={!online ? 'Offline' : (error.networkError as any)?.response?.status} />

  return (
    <Block gap={{ sm: 'lg', lg: 'xl' }} className={style.root}>
      {/* Hero */}
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

      <Block root={<section />} gap="md" contained padded>
        <Heading root={<h2 />} size={{ sm: 'lg', md: '2xl' }}>
          Trying something new? Start easy.
        </Heading>
        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {loading && !data?.beginner?.items
            ? Array(4)
                .fill(null)
                .map((_, key) => <TileSkeleton key={key} uniqueKey={`beginner-carousel--${key}`} surface />)
            : data.beginner.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<Link href={id} />}
                    key={id}
                    image={
                      <img
                        loading="lazy"
                        src={'/__remote' + adventurePrimaryImage?.src}
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
        </Carousel>
      </Block>

      {/* Camping Banner */}
      <Block contained padded>
        {loading && !data?.camping?.items ? (
          <BannerSkeleton uniqueKey="camping-banner" height={{ sm: '70vh', lg: '600px' }} />
        ) : (
          <Banner
            height={{ sm: '70vh', lg: '600px' }}
            align="left"
            vAlign="bottom"
            screen="dark"
            textColor="white"
            backgroundImage={
              <img
                src={'/__remote' + data.camping.items[0].adventurePrimaryImage?.src}
                width={data.camping.items[0].adventurePrimaryImage?.width}
                height={data.camping.items[0].adventurePrimaryImage?.height}
                alt={data.camping.items[0].adventureTitle}
              />
            }
            heading={
              <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }}>
                <Heading root={<span />} size={{ sm: 'xl', lg: '2xl' }}>
                  {data.camping.items[0].adventureTripLength} {data.camping.items[0].adventureType}
                </Heading>
                {data.camping.items[0].adventureTitle}
              </Heading>
            }
            button={
              data.camping.items[0] && (
                <Button root={<Link href={data.camping.items[0].id} />} variant="cta">
                  View Adventure
                </Button>
              )
            }
          />
        )}
      </Block>

      {/* Camping Carousel */}
      <Block root={<section />} gap="md" contained padded>
        <Heading root={<h2 />} size="2xl">
          For the outdoor kind.
        </Heading>
        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {loading && !data?.camping?.items
            ? Array(4)
                .fill(null)
                .map((_, key) => <TileSkeleton key={key} uniqueKey={`camping-carousel--${key}`} surface />)
            : data.camping.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<Link href={id} />}
                    key={id}
                    image={
                      <img
                        loading="lazy"
                        src={'/__remote' + adventurePrimaryImage?.src}
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
        </Carousel>
      </Block>

      {/* Overstay Banner */}
      <Block contained padded>
        {loading && !data?.overstay?.items ? (
          <BannerSkeleton uniqueKey="overstay-banner" height={{ sm: '70vh', lg: '600px' }} />
        ) : (
          <Banner
            height={{ sm: '70vh', lg: '600px' }}
            align="left"
            vAlign="bottom"
            screen="dark"
            textColor="white"
            backgroundImage={
              <img
                src={'/__remote' + data.overstay.items[0].adventurePrimaryImage?.src}
                width={data.overstay.items[0].adventurePrimaryImage?.width}
                height={data.overstay.items[0].adventurePrimaryImage?.height}
                alt={data.overstay.items[0].adventureTitle}
              />
            }
            heading={
              <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }}>
                <Heading root={<span />} size={{ sm: 'xl', lg: '2xl' }}>
                  {data.overstay.items[0].adventureTripLength} {data.overstay.items[0].adventureType}
                </Heading>
                {data.overstay.items[0].adventureTitle}
              </Heading>
            }
            button={
              data.overstay.items[0] && (
                <Button root={<Link href={data.overstay.items[0].id} />} variant="cta">
                  View Adventure
                </Button>
              )
            }
          />
        )}
      </Block>

      {/* Overstay Carousel */}
      <Block root={<section />} gap="md" contained padded>
        <Heading root={<h2 />} size="2xl">
          Time is a construct. Overstay.
        </Heading>

        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak hideScrollBar>
          {loading && !data?.overstay?.items
            ? Array(4)
                .fill(null)
                .map((_, key) => <TileSkeleton key={key} uniqueKey={`overstay-carousel--${key}`} surface />)
            : data.overstay.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<Link href={id} />}
                    key={id}
                    image={
                      <img
                        loading="lazy"
                        src={'/__remote' + adventurePrimaryImage?.src}
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
        </Carousel>
      </Block>
    </Block>
  )
}
