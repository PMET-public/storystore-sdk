import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

export const HOME_QUERY = gql`
  query HOME_QUERY {
    ships {
      id
      image
      name
      url
    }
  }
`

const Home = () => {
  const { loading, data, error } = useQuery(HOME_QUERY)

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>There was an issue.</h1>

  return (
    <section>
      <h2>SpaceX Ships</h2>
      {data.ships?.map(({ id, image, name, url }: any) => (
        <article key={id}>
          <h2>{name}</h2>
          <img width="300" src={image} />
          <br />
          <a href={url} target="blank">
            View Details
          </a>
        </article>
      ))}
    </section>
  )
}

export default Home
