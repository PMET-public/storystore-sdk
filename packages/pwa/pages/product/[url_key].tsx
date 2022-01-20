import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ProductTemplate } from '@storystore/ui-kit/templates'
import { gql, useQuery } from '@apollo/client'
import { Block, Heading, Price, Text, Html } from '@storystore/ui-kit'

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($filter: ProductAttributeFilterInput) {
    products(filter: $filter) {
      total_count
      items {
        uid: id
        url_key
        name
        sku
        new
        sale
        description {
          html
        }
        media_gallery {
          id: url
          label
          url
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
            regular_price {
              value
            }
          }
          maximum_price {
            regular_price {
              value
            }
          }
        }
      }
    }
  }
`

const ProductPage: NextPage = () => {
  const router = useRouter()

  const { url_key } = router.query

  const { loading, data, error } = useQuery(PRODUCT_QUERY, {
    skip: !url_key,
    variables: {
      filter: {
        url_key: {
          eq: url_key,
        },
      },
    },
    context: { clientName: 'commerce' },
  })

  const product = data?.products?.items?.[0]

  if (loading && !product) return <h1>Loading</h1>

  return (
    <ProductTemplate
      media={product?.media_gallery?.map(({ url, label }, key) => (
        <img key={key} width={400} height={500} src={url} alt={label} loading={key === 0 ? 'eager' : 'lazy'} />
      ))}
    >
      <Block gap="md">
        <Block gap="sm">
          {/* Product Title */}
          <Heading>{product?.name}</Heading>

          {/* Product Price */}
          {product && (
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
          )}

          {/* Product SKU */}
          {product?.sku && (
            <Text size="sm" style={{ opacity: 0.7 }}>
              SKU: {product.sku}
            </Text>
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
