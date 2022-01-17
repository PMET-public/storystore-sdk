import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { TemplateWithMedia2Columns } from '@storystore/ui-kit/templates'
import { gql, useQuery } from '@apollo/client'
import { Block, Heading, Price } from '@storystore/ui-kit'

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($filter: ProductAttributeFilterInput) {
    products(filter: $filter) {
      total_count
      items {
        uid: id
        url_key
        name
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

const ProductPage: NextPage = ({ ...props }) => {
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

  console.log(product)

  return (
    <TemplateWithMedia2Columns
      media={product && <img alt={product.media_gallery[0].label || product.name} src={product.media_gallery[0].url} />}
    >
      <Block gap="md">
        <Heading>{product?.name}</Heading>
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
      </Block>
    </TemplateWithMedia2Columns>
  )
}

export default ProductPage
