import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { Error, Block, Banner, SkeletonLoader, Heading, Text, Html, Card } from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import { AEMResponsiveGrid } from '../../../../../../../components'
import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager'
import NextImage from '../../../../../../../components/NextImage'

// Icons
import CalendarIcon from 'remixicon-react/CalendarCheckLineIcon'
import LengthIcon from 'remixicon-react/CalendarFillIcon'
import BagIcon from 'remixicon-react/BriefcaseLineIcon'
import GroupIcon from 'remixicon-react/GroupFillIcon'
import MedalIcon from 'remixicon-react/MedalFillIcon'
import PriceIcon from 'remixicon-react/PriceTag3FillIcon'

// GraphQL Query
import ADVENTURE_QUERY from './adventure.graphql'

const Loader = ({ ...props }) => (
  <SkeletonLoader uniqueKey="title-loader" height="1em" {...props}>
    <rect width="100%" height="100%" />
  </SkeletonLoader>
)

const AdventurePage: NextPage = () => {
  const { asPath } = useRouter()

  const pagePath = asPath.split('.html')?.[0]?.split('?')?.[0]

  // Network Online/Offline State
  const online = useNetworkStatus()

  // GraphQL QUery
  const { isReady, query } = useRouter()

  const path = query?.path

  const { loading, error, data } = useQuery(ADVENTURE_QUERY, { variables: { path }, skip: !isReady || !path })

  // Adventure Object
  const adventure = data?.adventureByPath.item

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
          height={{
            sm: '600px',
            lg: AuthoringUtils.isInEditor()
              ? '800px'
              : 'calc(100vh - var(--app-header-height) - var(--app-header-height))',
          }}
          style={{ position: 'sticky', top: 'var(--app-header-height)' }}
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

      {/* AEM Container */}
      {isReady && <AEMResponsiveGrid pagePath={pagePath} itemPath="root/responsivegrid" />}
    </Block>
  )
}

export default AdventurePage
