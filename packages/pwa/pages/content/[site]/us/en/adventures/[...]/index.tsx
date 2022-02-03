import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
  Error,
  Block,
  Banner,
  SkeletonLoader,
  Heading,
  Text,
  Html,
  Card,
  Carousel,
  TileSkeleton,
  Tile,
} from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import NextImage from '../../../../../../../components/NextImage'

// Icons
import MapIcon from 'remixicon-react/RoadMapLineIcon'
import CalendarIcon from 'remixicon-react/CalendarCheckLineIcon'
import LengthIcon from 'remixicon-react/CalendarFillIcon'
import BagIcon from 'remixicon-react/BriefcaseLineIcon'
import GroupIcon from 'remixicon-react/GroupFillIcon'
import MedalIcon from 'remixicon-react/MedalFillIcon'
import PriceIcon from 'remixicon-react/PriceTag3FillIcon'

// GraphQL Query
import ADVENTURE_QUERY from './adventure.graphql'
import ADVENTURES_QUERY from '../adventures.graphql'

// Stules
import style from './adventure.module.css'
import { ProductTemplate } from '@storystore/ui-kit/templates'

const AdventurePage: NextPage = () => {
  // Network Online/Offline State
  const online = useNetworkStatus()

  // GraphQL QUery
  const { isReady, query } = useRouter()
  const path = '/' + Array.from(query[''] || [])?.join('/')
  const { loading, error, data } = useQuery(ADVENTURE_QUERY, { variables: { path }, skip: !isReady })

  // Adventure Object
  const adventure = data?.adventureByPath.item

  const adventureList = data?.adventureList.items

  // Error View
  if (error) {
    // @ts-ignore
    const status = error.networkError?.statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  const items = null

  return (
    <ProductTemplate
      media={
        adventure && [
          <img
            key={0}
            // layout="fill"
            // objectFit="cover"
            loading="eager"
            src={adventure.adventurePrimaryImage._path}
            alt={adventure.adventureTitle}
            width={adventure.adventurePrimaryImage.width}
            height={adventure.adventurePrimaryImage.height}
          />,
        ]
      }
    >
      {adventure && (
        <Block gap="lg">
          {/* HEading */}
          <Heading size={{ sm: '2xl', md: '3xl', lg: '4xl' }} accent>
            {adventure.adventureTitle}
            <Heading root={<span />} size={{ sm: 'lg', md: 'xl', lg: '2xl' }}>
              {adventure.adventureTripLength} – {adventure.adventureType}
            </Heading>
          </Heading>

          <Block gap="md">
            {/* Overview */}
            <Block root={<Card />} gap="md">
              <Heading icon={<MapIcon />} size={{ sm: 'xl', lg: '2xl' }}>
                Overview
              </Heading>

              <Html htmlString={adventure?.adventureDescription.html} />
            </Block>

            {/* Details List/Icons */}
            <Block gap="md" columns="1fr 1fr">
              <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
                <Heading icon={<LengthIcon />} size="md">
                  Duration
                </Heading>
                <Text>{adventure?.adventureTripLength}</Text>
              </Block>

              <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
                <Heading icon={<GroupIcon />} size="md">
                  Group Size
                </Heading>
                <Text>{adventure?.adventureGroupSize}</Text>
              </Block>

              <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
                <Heading icon={<MedalIcon />} size="md">
                  Difficulty
                </Heading>
                <Text>{adventure?.adventureDifficulty}</Text>
              </Block>

              <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
                <Heading icon={<PriceIcon />} size="md">
                  Price
                </Heading>
                <Text>{adventure?.adventurePrice}</Text>
              </Block>
            </Block>

            {/* Itinerary Section */}
            <Block root={<Card />} gap="md">
              <Heading icon={<CalendarIcon />} size={{ sm: 'xl', lg: '2xl' }}>
                Itinerary
              </Heading>

              <Html htmlString={adventure?.adventureItinerary.html} />
            </Block>

            {/* What to Bring Section */}
            <Block root={<Card />} gap="md">
              <Heading icon={<BagIcon />} size={{ sm: 'xl', lg: '2xl' }}>
                What to Bring
              </Heading>

              <Html htmlString={adventure?.adventureGearList.html} />
            </Block>
          </Block>
        </Block>
      )}
    </ProductTemplate>
  )

  return (
    <Block gap="xl" contained padded>
      <Block gap="md" columns={{ sm: '1fr', lg: '1.5fr 1fr' }}>
        {/* Image */}

        <Banner
          className={style.image}
          height={{ sm: '600px', lg: '100vh' }}
          backgroundImage={
            adventure?.adventurePrimaryImage ? (
              <NextImage
                loading="eager"
                width={adventure.adventurePrimaryImage.width}
                height={adventure.adventurePrimaryImage.height}
                src={adventure.adventurePrimaryImage._path}
                layout="fill"
              />
            ) : (
              <SkeletonLoader uniqueKey="hero-loader" animate={loading} height="800px">
                <rect width="100%" height="100%" />
              </SkeletonLoader>
            )
          }
        />

        {/* Content */}
        <Block rows="1fr" vAlign="center" className={style.content}>
          {/* Description */}
          {adventure && (
            <Block gap="lg">
              {/* HEading */}
              <Heading size={{ sm: '2xl', md: '3xl', lg: '4xl' }} accent>
                {adventure.adventureTitle}
                <Heading root={<span />} size={{ sm: 'lg', md: 'xl', lg: '2xl' }}>
                  {adventure.adventureTripLength} – {adventure.adventureType}
                </Heading>
              </Heading>

              <Block gap="md">
                {/* Overview */}
                <Block root={<Card />} gap="md">
                  <Heading icon={<MapIcon />} size={{ sm: 'xl', lg: '2xl' }}>
                    Overview
                  </Heading>

                  <Html htmlString={adventure?.adventureDescription.html} />
                </Block>

                {/* Details List/Icons */}
                <Block gap="md" columns="1fr 1fr">
                  <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
                    <Heading icon={<LengthIcon />} size="md">
                      Duration
                    </Heading>
                    <Text>{adventure?.adventureTripLength}</Text>
                  </Block>

                  <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
                    <Heading icon={<GroupIcon />} size="md">
                      Group Size
                    </Heading>
                    <Text>{adventure?.adventureGroupSize}</Text>
                  </Block>

                  <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
                    <Heading icon={<MedalIcon />} size="md">
                      Difficulty
                    </Heading>
                    <Text>{adventure?.adventureDifficulty}</Text>
                  </Block>

                  <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
                    <Heading icon={<PriceIcon />} size="md">
                      Price
                    </Heading>
                    <Text>{adventure?.adventurePrice}</Text>
                  </Block>
                </Block>

                {/* Itinerary Section */}
                <Block root={<Card />} gap="md">
                  <Heading icon={<CalendarIcon />} size={{ sm: 'xl', lg: '2xl' }}>
                    Itinerary
                  </Heading>

                  <Html htmlString={adventure?.adventureItinerary.html} />
                </Block>

                {/* What to Bring Section */}
                <Block root={<Card />} gap="md">
                  <Heading icon={<BagIcon />} size={{ sm: 'xl', lg: '2xl' }}>
                    What to Bring
                  </Heading>

                  <Html htmlString={adventure?.adventureGearList.html} />
                </Block>
              </Block>
            </Block>
          )}
        </Block>
      </Block>

      <Carousel show={{ sm: 1, md: 2, lg: 3 }} gap="md" peak hideScrollBar>
        {adventureList?.map(({ _path, adventureTitle, adventurePrimaryImage }) => {
          return (
            <Tile
              key={_path}
              image={<img src={adventurePrimaryImage._path} alt={adventureTitle} width={500} height={500} />}
              heading={<Heading size="md">{adventureTitle}</Heading>}
            />
          )
        }) || [
          <TileSkeleton key={0} animate={loading} />,
          <TileSkeleton key={1} animate={loading} />,
          <TileSkeleton key={2} animate={loading} />,
          <TileSkeleton key={3} animate={loading} />,
        ]}
      </Carousel>
    </Block>
  )
}

export default AdventurePage
