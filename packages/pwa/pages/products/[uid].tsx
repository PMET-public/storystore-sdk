import { gql, useQuery } from '@apollo/client'
import { Block, Heading, Link, Pills, Price, Tile } from '@storystore/ui-kit/components'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

const COMMERCE_PRODUCTS_QUERY = gql`
  query COMMERCE_PRODUCTS_QUERY($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
      id: uid
      name

      children {
        uid
        name
      }
      products {
        items {
          uid: id
          url_key
          name
          categories {
            name
            uid
          }

          thumbnail {
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
  }
`

const ProductsPage: NextPage = () => {
  const router = useRouter()

  const { uid = 'NDI=' } = router.query

  const { register } = useForm({ mode: 'onChange' })

  const handleOnChange = useCallback(
    ([_uid]) => {
      router.push(`/products/${_uid}`)
    },
    [router]
  )

  const { loading, data, error } = useQuery(COMMERCE_PRODUCTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
    variables: {
      filters: {
        category_uid: {
          in: uid,
        },
      },
    },
    context: { clientName: 'commerce' },
  })

  if (loading) return <h1>⏳ Loading</h1>

  if (error) return <div>💩 {error.message}</div>

  const category = data?.categoryList?.[0]
  console.log({ category })

  return (
    <Block padded contained>
      <Pills
        label={<Heading size="md">{category.name}</Heading>}
        name="categoryIds"
        variant="single"
        items={category.children?.map(({ name, uid }) => ({ id: uid, label: name, value: uid, ...register(uid) }))}
        onChange={handleOnChange}
      />

      {/* Products */}
      <Block columns={{ sm: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }} gap="md">
        {category.products.items.map(({ name, url_key, thumbnail, price_range, categories }) => (
          <Tile
            key={url_key}
            surface
            vignette
            root={<Link href={`/product/${url_key}`} />}
            heading={<Heading size="xs">{name}</Heading>}
            image={<img width={400} height={500} loading="lazy" alt={thumbnail.label || name} src={thumbnail.url} />}
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
        ))}
      </Block>
    </Block>
  )
}

export default ProductsPage
