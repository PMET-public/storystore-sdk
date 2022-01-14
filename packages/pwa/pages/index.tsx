import { gql, useQuery } from '@apollo/client'
import { AEMExperienceFragment } from '@storystore/ui-kit/AEM'
import { NextPage } from 'next'

const COMMERCE_QUERY = gql`
  query COMMERCE_QUERY {
    storeConfig {
      id
      base_url
    }

    products(search: "", pageSize: 5) {
      total_count
      items {
        id
        url_key
        url_suffix
        name
        media_gallery {
          id: url
          label
          url
        }
      }
    }
  }
`

const HomePage: NextPage = () => {
  const { loading, data, error } = useQuery(COMMERCE_QUERY, { context: { clientName: 'commerce' } })

  if (loading) return <h1>⏳ Loading</h1>

  if (error) return <div>💩 {error.message}</div>

  return (
    <div>
      <AEMExperienceFragment pagePath="/content/experience-fragments/venia/us/en/site/deals/hero" />

      <h1>Store {data.storeConfig.id}</h1>
      {data.storeConfig.base_url}

      <ul>
        {data.products?.items?.map(({ id, name, media_gallery }) => (
          <li key={id}>
            <h2>{name}</h2>
            {media_gallery?.map(({ id, label, url }) => (
              <img key={id} src={url} alt={label} loading="lazy" />
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
