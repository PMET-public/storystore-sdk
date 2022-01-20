import { gql, useQuery } from '@apollo/client'
import { Block, Button, Heading, Link, Price, SkeletonLoader, Tile, TileSkeleton } from '@storystore/ui-kit/components'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// Styles
import style from './products.module.css'

const COMMERCE_PRODUCTS_QUERY = gql`
  query COMMERCE_PRODUCTS_QUERY(
    $categories: CategoryFilterInput
    $products: ProductAttributeFilterInput
    $pageSize: Int
  ) {
    categoryList(filters: $categories) {
      id: uid
      name
      children {
        id: uid
        uid
        name
        __typename
      }
      __typename
    }

    products(filter: $products, pageSize: $pageSize) {
      items {
        uid: id
        url_key
        name
        categories {
          name
          uid
          __typename
        }
        thumbnail {
          label
          url
          __typename
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
              __typename
            }
            regular_price {
              value
              __typename
            }
            __typename
          }
          maximum_price {
            regular_price {
              value
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

const ProductsPage: NextPage = () => {
  const router = useRouter()

  const { uid = 'NDI=' } = router.query

  const { loading, data, error } = useQuery(COMMERCE_PRODUCTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
    variables: {
      categories: {
        category_uid: {
          eq: uid,
        },
      },
      products: {
        category_uid: {
          eq: uid,
        },
      },
      pageSize: 9,
    },
    context: { clientName: 'commerce' },
  })

  if (error) return <div>💩 {error.message}</div>

  const category = data?.categoryList?.[0]
  const products = data?.products

  return (
    <Block padded contained style={{ paddingBottom: 'var(--spacing-xl)' }}>
      <div className={style.categories}>
        <Heading size="md">
          {category?.name || (
            <SkeletonLoader animate width="10em" height="1em">
              <rect width="100%" height="100%" />
            </SkeletonLoader>
          )}
        </Heading>

        {category?.children?.map(({ name, uid }) => (
          <Button key={uid} root={<Link href={`/products/${uid}`} />} transparent size="xs">
            {name}
          </Button>
        ))}
      </div>

      {/* Products */}
      <Block columns={{ sm: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }} gap="md">
        {loading && !products?.items ? (
          <>
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
          </>
        ) : (
          products.items.map(({ name, url_key, thumbnail, price_range, categories }) => (
            <Tile
              key={url_key}
              surface
              vignette
              root={<Link href={`/product/${url_key}`} />}
              heading={<Heading size="xs">{name}</Heading>}
              image={<img width={500} height={500} loading="lazy" alt={thumbnail.label || name} src={thumbnail.url} />}
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
              tags={categories?.map(({ name }) => `#${name}`)}
            />
          ))
        )}
      </Block>
    </Block>
  )
}

export default ProductsPage
