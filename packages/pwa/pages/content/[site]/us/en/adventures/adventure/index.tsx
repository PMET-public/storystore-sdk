import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { Error, Block, Banner, SkeletonLoader, Heading, Text, Html, Card } from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import { Utils } from '@adobe/aem-react-editable-components'
import { ModelManager } from '@adobe/aem-spa-page-model-manager'
import { AEMResponsiveGrid, AEMTitle } from '../../../../../../../components'
import NextImage from '../../../../../../../components/NextImage'

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
import { addApolloState, initializeApollo } from '../../../../../../../lib/apollo/client'

const Loader = ({ ...props }) => (
  <SkeletonLoader uniqueKey="title-loader" height="1em" {...props}>
    <rect width="100%" height="100%" />
  </SkeletonLoader>
)

const AdventurePage: NextPage<any> = ({ details, responsivegrid }) => {
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
              {isReady && (
                <AEMTitle
                  pagePath={pagePath}
                  itemPath="details/heading-duration"
                  icon={<LengthIcon />}
                  size="md"
                  {...details?.cqItems['heading-duration']}
                />
              )}

              {adventure?.adventureTripLength ? (
                <Text>{adventure.adventureTripLength}</Text>
              ) : (
                <Loader animate={loading} width="6em" />
              )}
            </Block>

            {/* Group Size  */}
            <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
              {isReady && (
                <AEMTitle
                  pagePath={pagePath}
                  itemPath="details/heading-group-size"
                  icon={<GroupIcon />}
                  size="md"
                  {...details?.cqItems['heading-group-size']}
                />
              )}

              {adventure?.adventureGroupSize ? (
                <Text>{adventure.adventureGroupSize}</Text>
              ) : (
                <Loader animate={loading} width="6em" />
              )}
            </Block>

            {/* Difficulty */}
            <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
              {isReady && (
                <AEMTitle
                  pagePath={pagePath}
                  itemPath="details/heading-difficulty"
                  icon={<MedalIcon />}
                  size="md"
                  {...details?.cqItems['heading-difficulty']}
                />
              )}

              {adventure?.adventureDifficulty ? (
                <Text>{adventure.adventureDifficulty}</Text>
              ) : (
                <Loader animate={loading} width="6em" />
              )}
            </Block>

            {/* Price */}
            <Block root={<Card />} columns="auto 1fr" gap="sm" vAlign="center">
              {isReady && (
                <AEMTitle
                  pagePath={pagePath}
                  itemPath="details/heading-price"
                  icon={<PriceIcon />}
                  size="md"
                  {...details?.cqItems['heading-price']}
                />
              )}

              {adventure?.adventurePrice ? (
                <Text>{adventure.adventurePrice}</Text>
              ) : (
                <Loader animate={loading} width="6em" />
              )}
            </Block>
          </Block>

          {/* Itinerary Section */}
          <Block root={<Card />} gap="md">
            {isReady && (
              <AEMTitle
                pagePath={pagePath}
                itemPath="details/heading-itinerary"
                icon={<CalendarIcon />}
                size={{ sm: 'xl', lg: '2xl' }}
                {...details?.cqItems['heading-itinerary']}
              />
            )}

            {adventure?.adventureItinerary?.html ? (
              <Html htmlString={adventure.adventureItinerary.html} />
            ) : (
              <Loader animate={loading} />
            )}
          </Block>

          {/* What to Bring Section */}
          <Block root={<Card />} gap="md">
            {isReady && (
              <AEMTitle
                pagePath={pagePath}
                itemPath="details/heading-what-to-bring"
                icon={<BagIcon />}
                size={{ sm: 'xl', lg: '2xl' }}
                {...details?.cqItems['heading-what-to-bring']}
              />
            )}

            {adventure?.adventureGearList?.html ? (
              <Html htmlString={adventure?.adventureGearList.html} />
            ) : (
              <Loader animate={loading} />
            )}
          </Block>
        </Block>
      </Block>

      {/* AEM Container */}
      {isReady && <AEMResponsiveGrid pagePath={pagePath} itemPath="root/responsivegrid" {...responsivegrid} />}
    </Block>
  )
}

/** Server-Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  /** Get AEM Model data */
  const [path, damPath] = req.url.split('?')
  const model = await ModelManager.getData(path)
  const details = Utils.modelToProps(model?.[':items']?.details)
  const responsivegrid = Utils.modelToProps(model?.[':items']?.root[':items'].responsivegrid)

  const apolloClient = initializeApollo()

  try {
    if (damPath) {
      await apolloClient.query({
        query: ADVENTURE_QUERY,
        variables: { path: damPath?.split('path=')[1] },
      })
    }
  } catch (error) {
    console.log(error)
  }

  return addApolloState(apolloClient, {
    props: {
      details,
      responsivegrid,
    },
  })
}

export default AdventurePage
