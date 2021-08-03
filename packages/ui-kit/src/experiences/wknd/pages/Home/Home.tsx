import { FunctionComponent } from 'react'
import style from './Home.module.css'
import { useQuery } from '@apollo/client'
import Grid from '../../../../components/Grid'
import View from '../../../../components/View'
import Banner from '../../../../components/Banner'
import Carousel from '../../../../components/Carousel'
import Tile from '../../../../components/Tile'
import Heading from '../../../../components/Heading'
import Button from '../../../../components/Button'
import Image from '../../../../components/Image'
import gql from 'graphql-tag'
import bgImageBanner from '../../assets/bg-adventures-1.jpg'

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

export const Home: FunctionComponent = () => {
  const { loading, data, error } = useQuery(HOME_QUERY)

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>There was an issue.</h1>

  return (
    <Grid gap={{ small: 'lg', large: '2xl' }} className={style.root}>
      <Banner
        backgroundColor="#f4ecea"
        backgroundImage={<Image src={bgImageBanner} />}
        height={{ small: '80vh', large: '70vh' }}
        heading={
          <Heading root={<h2 />} size={{ small: 'xl', large: '4xl' }}>
            Not all who wander are lost.
          </Heading>
        }
        button={<Button>Find Getaway</Button>}
        align="left"
        contained
      />

      {data.beginner && (
        <View contained padded>
          <Grid root={<section />} gap={{ small: 'md', large: 'lg' }}>
            <Heading root={<h2 />} size="2xl">
              Trying something new? Start easy.
            </Heading>

            <Carousel
              show={{ small: 1, large: 3 }}
              gap="sm"
              peak
              hideScrollBar
              items={data.beginner.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<article />}
                    className={style.tile}
                    key={id}
                    image={
                      <Image
                        loading="lazy"
                        src={adventurePrimaryImage.src}
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
              <Image
                src={data.bannerCamping.item.adventurePrimaryImage.src}
                width={data.bannerCamping.item.adventurePrimaryImage.width}
                height={data.bannerCamping.item.adventurePrimaryImage.height}
                alt={data.bannerCamping.item.adventureTitle}
              />
            }
            height={{ small: '70vh', large: '600px' }}
            heading={
              <div>
                <Heading root={<h2 />} size={{ small: 'xl', large: '4xl' }}>
                  <span className={style.subheading}>
                    {data.bannerCamping.item.adventureTripLength} {data.bannerCamping.item.adventureType}
                  </span>
                  {data.bannerCamping.item.adventureTitle}
                </Heading>
              </div>
            }
            button={<Button variant="cta">View Adventure</Button>}
            align="left"
            vAlign="bottom"
            screen="dark"
          />
        </View>
      )}

      {data.camping && (
        <View contained padded>
          <Grid root={<section />} gap={{ small: 'md', large: 'lg' }}>
            <Heading root={<h2 />} size="2xl">
              For the outdoor kind.
            </Heading>

            <Carousel
              show={{ small: 1, large: 3 }}
              gap="sm"
              peak
              hideScrollBar
              items={data.camping.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<article />}
                    className={style.tile}
                    key={id}
                    image={
                      <Image
                        loading="lazy"
                        src={adventurePrimaryImage.src}
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
              <Image
                src={data.bannerSurfing.item.adventurePrimaryImage.src}
                width={data.bannerSurfing.item.adventurePrimaryImage.width}
                height={data.bannerSurfing.item.adventurePrimaryImage.height}
                alt={data.bannerSurfing.item.adventureTitle}
              />
            }
            height={{ small: '70vh', large: '600px' }}
            heading={
              <Heading root={<h2 />} size={{ small: 'xl', large: '4xl' }}>
                <span className={style.subheading}>
                  {data.bannerSurfing.item.adventureTripLength} {data.bannerSurfing.item.adventureType}
                </span>
                {data.bannerSurfing.item.adventureTitle}
              </Heading>
            }
            button={<Button variant="cta">View Adventure</Button>}
            align="left"
            vAlign="bottom"
            screen="dark"
          />
        </View>
      )}

      {data.overstay && (
        <View contained padded>
          <Grid root={<section />} gap={{ small: 'md', large: 'lg' }}>
            <Heading root={<h2 />} size="2xl">
              Time is a construct. Overstay.
            </Heading>

            <Carousel
              show={{ small: 1, large: 3 }}
              gap="sm"
              peak
              hideScrollBar
              items={data.overstay.items.map(
                ({ id, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }: any) => (
                  <Tile
                    root={<article />}
                    className={style.tile}
                    key={id}
                    image={
                      <Image
                        loading="lazy"
                        src={adventurePrimaryImage.src}
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
      <br />
    </Grid>
  )
}
