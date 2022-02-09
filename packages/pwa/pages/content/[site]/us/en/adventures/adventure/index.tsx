import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
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
  Tile,
  Link,
  Price,
  TileSkeleton,
} from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import NextImage from '../../../../../../../components/NextImage'
import { addApolloState, initializeApollo } from '../../../../../../../lib/apollo/client'

// Icons
import CalendarIcon from 'remixicon-react/CalendarCheckLineIcon'
import LengthIcon from 'remixicon-react/CalendarFillIcon'
import BagIcon from 'remixicon-react/BriefcaseLineIcon'
import GroupIcon from 'remixicon-react/GroupFillIcon'
import MedalIcon from 'remixicon-react/MedalFillIcon'
import PriceIcon from 'remixicon-react/PriceTag3FillIcon'

// Styles
import styles from './adventure.module.css'

// GraphQL Query
import ADVENTURE_QUERY from './adventure.graphql'

const Loader = ({ ...props }) => (
  <SkeletonLoader uniqueKey="title-loader" height="1em" {...props}>
    <rect width="100%" height="100%" />
  </SkeletonLoader>
)

const AdventurePage: NextPage = () => {
  // Network Online/Offline State
  const online = useNetworkStatus()

  // GraphQL QUery
  const { isReady, query } = useRouter()

  const path = query?.path

  const { loading, error, data } = useQuery<any>(ADVENTURE_QUERY, {
    variables: { path },
    skip: !isReady || !path,
  })

  // Adventure
  const adventure = data?.adventureByPath.item

  // Products
  const products = data?.products?.items

  // More Adventures
  const moreAdventures = data?.moreAdventures?.items

  // Error View
  if (error) {
    // @ts-ignore
    const status = error.networkError?.statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  return (
    <Block gap="xl" contained padded>
      <Block gap="md" columns={{ sm: '1f', lg: '1fr 1fr' }}>
        {/* Image */}
        <Banner
          className={styles.hero}
          backgroundImage={
            adventure?.adventurePrimaryImage ? (
              <NextImage loading="eager" src={adventure.adventurePrimaryImage._path} layout="fill" objectFit="cover" />
            ) : (
              <Loader animate={loading} height="800px" width="100%" />
            )
          }
        />

        <Block gap="md">
          {/* Overview */}
          <Block root={<Card />} gap="md">
            <Heading size={{ sm: '2xl', lg: '4xl' }} accent>
              {adventure?.adventureTitle || <Loader animate={loading} />}
            </Heading>

            {adventure?.adventureDescription?.html ? (
              <Html htmlString={adventure.adventureDescription.html} />
            ) : (
              <Loader animate={loading} />
            )}
          </Block>

          {/* Details */}
          <Block gap="md" columns={{ sm: '1fr', md: '1fr 1fr' }}>
            {/* Duration */}
            <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
              <Heading icon={<LengthIcon />} size="md">
                Duration
              </Heading>

              {adventure?.adventureTripLength ? (
                <Text>{adventure.adventureTripLength}</Text>
              ) : (
                <Loader animate={loading} width="6em" />
              )}
            </Block>

            {/* Group Size  */}
            <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
              <Heading icon={<GroupIcon />} size="md">
                Group Size
              </Heading>

              {adventure?.adventureGroupSize ? (
                <Text>{adventure.adventureGroupSize}</Text>
              ) : (
                <Loader animate={loading} width="6em" />
              )}
            </Block>

            {/* Difficulty */}
            <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
              <Heading icon={<MedalIcon />} size="md">
                Difficulty
              </Heading>

              {adventure?.adventureDifficulty ? (
                <Text>{adventure.adventureDifficulty}</Text>
              ) : (
                <Loader animate={loading} width="6em" />
              )}
            </Block>

            {/* Price */}
            <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
              <Heading icon={<PriceIcon />} size="md">
                Price
              </Heading>

              {adventure?.adventurePrice ? (
                <Text>{adventure.adventurePrice}</Text>
              ) : (
                <Loader animate={loading} width="6em" />
              )}
            </Block>
          </Block>

          {/* Itinerary Section */}
          <Block root={<Card />} gap="md">
            <Heading icon={<CalendarIcon />} size={{ sm: 'xl', lg: '2xl' }}>
              Itinerary
            </Heading>

            {adventure?.adventureItinerary?.html ? (
              <Html htmlString={adventure.adventureItinerary.html} />
            ) : (
              <Loader animate={loading} />
            )}
          </Block>

          {/* What to Bring Section */}
          <Block root={<Card />} gap="md">
            <Heading icon={<BagIcon />} size={{ sm: 'xl', lg: '2xl' }}>
              What to Bring
            </Heading>

            {adventure?.adventureGearList?.html ? (
              <Html htmlString={adventure?.adventureGearList.html} />
            ) : (
              <Loader animate={loading} />
            )}
          </Block>
        </Block>
      </Block>

      {/* Recommended Products */}
      <Block gap="md">
        <Heading size={{ sm: 'xl', md: '2xl' }}>Gear up. It's adventure time!</Heading>

        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak>
          {products?.map(({ url_key, name, thumbnail, categories, price_range }) => (
            <Tile
              key={url_key}
              root={<Link href={`${process.env.NEXT_PUBLIC_HOME_PATH}/products/product?path=${url_key}`} />}
              image={<NextImage src={thumbnail.url} width={500} height={500} alt={thumbnail.label} />}
              heading={<Heading>{name}</Heading>}
              subheading={
                <Price
                  currency={price_range.minimum_price.regular_price.currency}
                  label={
                    price_range.minimum_price.regular_price < price_range.maximum_price.regular_price
                      ? 'Starting at'
                      : undefined
                  }
                  regular={price_range.minimum_price.regular_price.value}
                  special={
                    price_range.minimum_price.regular_price.value > price_range.minimum_price.final_price.value
                      ? price_range.minimum_price.final_price.value
                      : undefined
                  }
                />
              }
              tags={categories.map(c => '#' + c.name)}
              surface
            />
          )) || [
            <TileSkeleton key={0} uniqueKey="0" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={1} uniqueKey="1" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={2} uniqueKey="2" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={3} uniqueKey="3" animate={loading} imageWidth={500} imageHeight={500} />,
          ]}
        </Carousel>
      </Block>

      {/* More Adventures */}
      <Block gap="md" contained padded>
        <Heading size={{ sm: 'xl', md: '2xl' }}>Looking for more? Your adventure awaits.</Heading>

        <Carousel show={{ sm: 1, lg: 3 }} gap="sm" peak>
          {moreAdventures?.map(
            ({ _path, adventureTitle, adventureTripLength, adventureActivity, adventurePrimaryImage }) => (
              <Tile
                key={_path}
                root={<Link href={`${process.env.NEXT_PUBLIC_HOME_PATH}/adventures/adventure?path=${_path}`} />}
                image={<NextImage src={adventurePrimaryImage._path} width={500} height={500} alt={adventureTitle} />}
                heading={<Heading>{adventureTitle}</Heading>}
                tags={[`${adventureTripLength} ${adventureActivity}`]}
              />
            )
          ) || [
            <TileSkeleton key={0} uniqueKey="0" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={1} uniqueKey="1" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={2} uniqueKey="2" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={3} uniqueKey="3" animate={loading} imageWidth={500} imageHeight={500} />,
          ]}
        </Carousel>
      </Block>
    </Block>
  )
}

/** Server-Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo()

  const path = query.path

  const props: any = {}

  try {
    await Promise.all([
      // GraphQL Query
      apolloClient.query({
        query: ADVENTURE_QUERY,
        variables: { path },
      }),
    ])
  } catch (error) {
    console.error(error)
  }

  return addApolloState(apolloClient, {
    props,
  })
}

export default AdventurePage
