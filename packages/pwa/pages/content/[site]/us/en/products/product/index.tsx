import { useQuery } from '@apollo/client'
import {
  Banner,
  Block,
  Button,
  Card,
  Carousel,
  Error,
  Heading,
  Html,
  Link,
  Price,
  SkeletonLoader,
  Text,
  Tile,
  TileSkeleton,
} from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import NextImage from '../../../../../../../components/NextImage'
import { addApolloState, initializeApollo } from '../../../../../../../lib/apollo/client'

// Styles
import styles from './product.module.css'

// GraphQl Query
import PRODUCT_QUERY from './product.graphql'

const Loader = ({ ...props }) => (
  <SkeletonLoader uniqueKey="title-loader" height="1em" {...props}>
    <rect width="100%" height="100%" />
  </SkeletonLoader>
)

const ProductPage: NextPage = () => {
  // Network Online/Offline State
  const online = useNetworkStatus()

  // GraphQL QUery
  const { isReady, query } = useRouter()

  const path = query?.path

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
    variables: {
      filter: {
        url_key: {
          eq: path,
        },
      },
    },
    skip: !isReady || !path,
  })

  // Error View
  if (error) {
    // @ts-ignore
    const status = error.networkError?.statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  const product = data?.products?.items?.[0]

  const adventures = data?.adventureList?.items

  return (
    <Block gap="xl" contained padded>
      <Block gap="md" columns={{ sm: '1f', lg: '1fr 1fr' }}>
        {/* Image Gallery */}

        {/* Mobile Gallery */}
        <Carousel
          show={1}
          gap="sm"
          peak={product?.media_gallery?.length > 1}
          hideScrollBar
          className={styles.mobileGallery}
        >
          {product?.media_gallery?.map(({ url, label }, key) => (
            <Banner
              key={key}
              width="100%"
              height={{ sm: '70vh', lg: 'var(--app-body-height) ' }}
              backgroundImage={
                <NextImage
                  key={key}
                  layout="fill"
                  src={url}
                  alt={label}
                  objectFit="contain"
                  loading={key === 0 ? 'eager' : 'lazy'}
                />
              }
            />
          ))}
        </Carousel>

        {/* Desktop Gallery */}
        <Block gap="sm" vAlign="center" align="center" className={styles.gallery}>
          {product?.media_gallery?.map(({ url, label }, key) => (
            <Banner
              key={key}
              height={{ sm: '70vh', lg: 'var(--app-body-height) ' }}
              backgroundImage={
                <NextImage
                  key={key}
                  layout="fill"
                  src={url}
                  alt={label}
                  objectFit="contain"
                  loading={key === 0 ? 'eager' : 'lazy'}
                />
              }
            />
          ))}
        </Block>

        {/* Details */}
        <Block gap="md">
          {/* Overview */}
          <Block root={<Card />} gap="md" className={styles.details}>
            {/* Name */}
            <Heading size={{ sm: '2xl', lg: '4xl' }} accent>
              {product?.name || <Loader animate={loading} />}
            </Heading>

            {/* Categories */}
            <Block gap="sm" columns={product?.categories?.map(() => 'max-content').join(' ')}>
              {product?.categories?.map((category, key) => (
                <Text size="xs" key={key}>
                  #{category.name}
                </Text>
              ))}
            </Block>

            {/* Price */}
            {product?.price_range ? (
              <Heading root={<div />}>
                <Price
                  currency={product.price_range.minimum_price.regular_price.currency}
                  label={
                    product.price_range.minimum_price.regular_price < product.price_range.maximum_price.regular_price
                      ? 'Starting at'
                      : undefined
                  }
                  regular={product.price_range.minimum_price.regular_price.value}
                  special={
                    product.price_range.minimum_price.regular_price.value >
                    product.price_range.minimum_price.final_price.value
                      ? product.price_range.minimum_price.final_price.value
                      : undefined
                  }
                />
              </Heading>
            ) : (
              <Loader animate={loading} />
            )}

            {/* SKU */}
            <Text size="sm" color="gray">
              SKU. {product?.sku || <Loader animate={loading} width="4em" />}
            </Text>

            {/* Add to Cart */}
            <Button variant="cta" disabled>
              Add to Cart
            </Button>

            {/* Description */}
            {product?.description?.html ? (
              <Html htmlString={product.description.html} />
            ) : (
              loading && <Loader animate={loading} />
            )}
          </Block>
        </Block>
      </Block>

      {/*  Adventures */}
      <Block gap="md" contained padded>
        <Heading size={{ sm: 'xl', md: '2xl' }}>Looking for more? Your adventure awaits.</Heading>

        <Carousel show={{ sm: 1, md: 2, lg: 3 }} gap="sm" peak>
          {adventures?.map(
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
        query: PRODUCT_QUERY,
        variables: {
          filter: {
            url_key: {
              eq: path,
            },
          },
        },
      }),
    ])
  } catch (error) {
    console.error(error)
  }

  return addApolloState(apolloClient, {
    props,
  })
}

export default ProductPage
