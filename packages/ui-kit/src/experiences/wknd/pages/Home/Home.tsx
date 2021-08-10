import { FunctionComponent, ReactElement } from 'react'
import style from './Home.module.css'
import { useQuery } from '@apollo/client'
import Link from '../../../../components/Link'
import Grid from '../../../../components/Grid'
import View from '../../../../components/View'
import Banner from '../../../../components/Banner'
import Carousel from '../../../../components/Carousel'
import Tile from '../../../../components/Tile'
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

    bannerCamping: adventureByPath(
      _path: "/content/dam/wknd/en/adventures/riverside-camping-australia/riverside-camping-australia"
    ) {
      item {
        id: _path
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

    bannerSurfing: adventureByPath(
      _path: "/content/dam/wknd/en/adventures/surf-camp-in-costa-rica/surf-camp-costa-rica"
    ) {
      item {
        id: _path
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
  heroCTAHref?: string
}

export const Home: FunctionComponent<HomeProps> = ({ heroCTAHref }) => {
  const { loading, data, error } = useQuery(HOME_QUERY)

  if (loading) return <h1>Loading...</h1>

  if (error) return <Error status={(error.networkError as any)?.response.status} style={{ height: '100%' }} />

  return (
    <Grid gap={{ sm: 'lg', lg: 'xl' }} className={style.root}>
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
          <Heading
            className={style.heroHeading}
            root={<h2 />}
            size={{ sm: '4xl', md: '5xl' }}
            style={{ paddingRight: '100px' }}
          >
            Not all who wander are lost.
          </Heading>
        }
        button={heroCTAHref ? <Button root={<Link href={heroCTAHref} />}>View Adventures</Button> : undefined}
        align="left"
        contained
      />

      {data.beginner && (
        <View contained padded>
          <Grid root={<section />} gap={{ sm: 'md', lg: 'lg' }}>
            <Heading root={<h2 />} size={{ sm: 'lg', md: '2xl' }}>
              Trying something new? Start easy.
            </Heading>

            <Carousel
              show={{ sm: 1, lg: 3 }}
              gap="sm"
              peak
              hideScrollBar
              items={data.beginner.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<Link href={id} />}
                    className={style.tile}
                    key={id}
                    image={
                      <img
                        loading="lazy"
                        src={'/__aem' + adventurePrimaryImage.src}
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
            />
          </Grid>
        </View>
      )}

      {data.bannerCamping?.item && (
        <View contained padded>
          <Banner
            className={style.banner}
            backgroundImage={
              <img
                src={'/__aem' + data.bannerCamping.item.adventurePrimaryImage.src}
                width={data.bannerCamping.item.adventurePrimaryImage.width}
                height={data.bannerCamping.item.adventurePrimaryImage.height}
                alt={data.bannerCamping.item.adventureTitle}
              />
            }
            height={{ sm: '70vh', lg: '600px' }}
            heading={
              <div>
                <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }}>
                  <span className={style.subheading}>
                    {data.bannerCamping.item.adventureTripLength} {data.bannerCamping.item.adventureType}
                  </span>
                  {data.bannerCamping.item.adventureTitle}
                </Heading>
              </div>
            }
            button={
              <Button root={<Link href={data.bannerCamping.item.id} />} variant="cta">
                View Adventure
              </Button>
            }
            align="left"
            vAlign="bottom"
            screen="dark"
          />
        </View>
      )}

      {data.camping && (
        <View contained padded>
          <Grid root={<section />} gap={{ sm: 'md', lg: 'lg' }}>
            <Heading root={<h2 />} size="2xl">
              For the outdoor kind.
            </Heading>

            <Carousel
              show={{ sm: 1, lg: 3 }}
              gap="sm"
              peak
              hideScrollBar
              items={data.camping.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<Link href={id} />}
                    className={style.tile}
                    key={id}
                    image={
                      <img
                        loading="lazy"
                        src={'/__aem' + adventurePrimaryImage.src}
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
            />
          </Grid>
        </View>
      )}

      {data.bannerSurfing?.item && (
        <View contained padded>
          <Banner
            className={style.banner}
            backgroundImage={
              <img
                src={'/__aem' + data.bannerSurfing.item.adventurePrimaryImage.src}
                width={data.bannerSurfing.item.adventurePrimaryImage.width}
                height={data.bannerSurfing.item.adventurePrimaryImage.height}
                alt={data.bannerSurfing.item.adventureTitle}
              />
            }
            height={{ sm: '70vh', lg: '600px' }}
            heading={
              <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }}>
                <span className={style.subheading}>
                  {data.bannerSurfing.item.adventureTripLength} {data.bannerSurfing.item.adventureType}
                </span>
                {data.bannerSurfing.item.adventureTitle}
              </Heading>
            }
            button={
              <Button root={<Link href={data.bannerSurfing.item.id} />} variant="cta">
                View Adventure
              </Button>
            }
            align="left"
            vAlign="bottom"
            screen="dark"
          />
        </View>
      )}

      {data.overstay && (
        <View contained padded>
          <Grid root={<section />} gap={{ sm: 'md', lg: 'lg' }}>
            <Heading root={<h2 />} size="2xl">
              Time is a construct. Overstay.
            </Heading>

            <Carousel
              show={{ sm: 1, lg: 3 }}
              gap="sm"
              peak
              hideScrollBar
              items={data.overstay.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<Link href={id} />}
                    className={style.tile}
                    key={id}
                    image={
                      <img
                        loading="lazy"
                        src={'/__aem' + adventurePrimaryImage.src}
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
            />
          </Grid>
        </View>
      )}
    </Grid>
  )
}
