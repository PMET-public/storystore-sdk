import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ProductTemplate } from '@storystore/ui-kit/templates'
import { useQuery } from '@apollo/client'
import { Block, Heading, Price, Text, Html, SkeletonLoader } from '@storystore/ui-kit'
import NextImage from '../../components/NextImage'

import PRODUCTS_QUERY from './product.graphql'

const ProductPage: NextPage = () => {
  const router = useRouter()

  const { url_key } = router.query

  const { loading, data } = useQuery(PRODUCTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
    skip: !url_key,
    variables: {
      filter: {
        url_key: {
          eq: url_key,
        },
      },
    },
  })

  const product = data?.products?.items?.[0]

  return (
    <ProductTemplate
      media={
        product?.media_gallery?.map(({ url, label }, key) => (
          <NextImage
            key={key}
            width={1000}
            height={1000}
            src={url}
            alt={label}
            objectFit="contain"
            loading={key === 0 ? 'eager' : 'lazy'}
          />
        )) || [
          <img
            key="loader"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt=""
            width={500}
            height={500}
            style={{ background: 'var(--color-skeleton)' }}
          />,
        ]
      }
    >
      <Block gap="md" columns="1fr">
        <Block gap="sm">
          {/* Product Title */}
          <Heading size="lg">
            {product?.name ? (
              product.name
            ) : (
              <SkeletonLoader animate={loading} width="10em" height="1em">
                <rect width="100%" height="100%" />
              </SkeletonLoader>
            )}
          </Heading>

          {/* Product Price */}
          {product?.price_range ? (
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
          ) : (
            <SkeletonLoader animate={loading} width="7em" height="1em">
              <rect width="100%" height="100%" />
            </SkeletonLoader>
          )}

          {/* Product SKU */}
          {product?.sku ? (
            <Text size="sm" style={{ opacity: 0.7 }}>
              SKU: {product.sku}
            </Text>
          ) : (
            <SkeletonLoader animate={loading} width="5em" height="1em">
              <rect width="100%" height="100%" />
            </SkeletonLoader>
          )}
        </Block>

        {/* Product Description */}
        {product?.description && (
          <Text size="sm">
            <Html htmlString={product.description.html} />
          </Text>
        )}
      </Block>
    </ProductTemplate>
  )
}

export default ProductPage
