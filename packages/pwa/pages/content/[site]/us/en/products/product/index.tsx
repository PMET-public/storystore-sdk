import { useQuery } from '@apollo/client'
import { Banner, Block, Card, Error, Heading, Html, SkeletonLoader } from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import NextImage from '../../../../../../../components/NextImage'

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

  return (
    <Block gap="xl" contained padded>
      <Block gap="md" columns={{ sm: '1f', lg: '1fr 1fr' }}>
        {/* Image */}
        <Banner
          height="var(--app-body-height)"
          backgroundImage={
            <Block gap="sm" vAlign="center" align="center">
              {product?.media_gallery?.map(({ url, label }, key) => (
                <NextImage
                  key={key}
                  layout="fill"
                  src={url}
                  alt={label}
                  objectFit="contain"
                  loading={key === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </Block>
          }
        />

        <Block gap="md">
          {/* Overview */}
          <Block root={<Card />} gap="md">
            <Heading size={{ sm: '2xl', lg: '4xl' }} accent>
              {product?.name || <Loader animate={loading} />}
            </Heading>

            {product?.description?.html ? <Html htmlString={product.description.html} /> : <Loader animate={loading} />}
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

export default ProductPage
